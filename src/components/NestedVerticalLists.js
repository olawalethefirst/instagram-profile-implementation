// import React from 'react';
import { View, Platform } from 'react-native';
import styles from '../screens/styles';
import { width } from '../constants';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDecay,
    cancelAnimation,
    withSpring,
    useDerivedValue,
    withTiming,
    runOnJS,
    runOnUI,
} from 'react-native-reanimated';
import {
    GestureDetector,
    Gesture,
    gestureHandlerRootHOC,
    ScrollView,
} from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import RefreshControl from '../components/RefreshControl';
import { useEffect, useCallback, useState, useMemo } from 'react';

const minRefreshDistance = 40;
const elasticityPercentile = 0.05;
const scrollAnimationTiming = 100;
const list1MaxHeight = 20 * 100;
const list2MaxHeight = 1 * 100;
const TOP = 'TOP';
const BOTTOM = 'BOTTOM';
const VERTICAL = 'VERTICAL';
const HORIZONTAL = 'HORIZONTAL';

const GestureContainer =
    Platform.OS === 'android' ? gestureHandlerRootHOC(View) : View;

export default function NestedVerticalLists({
    topComp,
    list1,
    list2,
    renderList,
    refreshing,
    onRefresh,
    // RefreshControl
}) {
    const [triggeredOnRefresh, setTriggeredOnRefresh] = useState(false);

    //positioned at top to maximize update as effeciently as possible

    //animation values/functions
    const totalViewHeight = useSharedValue(0);
    const totalViewWidth = useSharedValue(0);
    const getTenthOfTotalView = (view) => {
        'worklet';

        switch (view) {
            case VERTICAL:
                return 0.1 * totalViewHeight.value;
            case HORIZONTAL:
                return 0.1 * totalViewWidth.value;
            default:
                return null;
        }
    };
    const topCompHeight = useSharedValue(0);
    const scrollingVertical = useSharedValue(false);
    const scrollingHorizontal = useSharedValue(false);
    const translateYTemp = useSharedValue(0);
    const translateXTemp = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isTopCompVisible = () => {
        'worklet';

        return translateY.value > -topCompHeight.value;
    };
    const translateX = useSharedValue(0);
    const isList1Active = () => {
        'worklet';

        return translateX.value > -(width / 2);
    };
    const translateL1Temp = useSharedValue(0);
    const translateL2Temp = useSharedValue(0);
    const translateL1 = useDerivedValue(() => {
        if (isTopCompVisible() || isList1Active()) {
            const newValue = translateY.value;
            translateL1Temp.value = newValue;
            return newValue;
        }
        return translateL1Temp.value;
    }, [isList1Active, isTopCompVisible]);
    const translateL2 = useDerivedValue(() => {
        if (isTopCompVisible() || !isList1Active()) {
            const newValue = translateY.value;
            translateL2Temp.value = newValue;
            return newValue;
        }
        return translateL2Temp.value;
    }, [isList1Active, isTopCompVisible]);
    const refreshingActive = useSharedValue(false);

    //TO IMPLEMENT
    //refresh trigger
    //load more trigger
    //

    //helper functions
    const getNestedListMaxHeight = () => {
        'worklet';

        return isList1Active() ? list1MaxHeight : list2MaxHeight;
    };
    const getCurrentTranslateY = () => {
        'worklet';

        return isTopCompVisible()
            ? translateY.value
            : isList1Active()
            ? translateL1.value
            : translateL2.value;
    };
    const isListShorterThanTotalView = () => {
        'worklet';

        return (
            getNestedListMaxHeight() + topCompHeight.value <
            totalViewHeight.value
        );
    };
    const maxTranslateY = () => {
        //to change approach to array of values that is updated on nested layout change
        'worklet';

        //negates maximum translateY for animational direction
        return -Math.max(
            topCompHeight.value +
                getNestedListMaxHeight() -
                totalViewHeight.value,
            0
        );
    };
    const getTopHinge = () => {
        'worklet';

        return refreshingActive.value ? minRefreshDistance : 0;
    };
    const isVerticalListWithinHinge = () => {
        'worklet';

        return (
            getTopHinge() >= translateY.value &&
            translateY.value >= maxTranslateY()
        );
    };
    const getVerticalOutOfHingeLocation = () => {
        'worklet';

        if (translateY.value > getTopHinge()) {
            return TOP;
        } else if (translateY.value < maxTranslateY()) {
            return BOTTOM;
        } else {
            return null;
        }
    };
    const toggleVerticalListToTopHinge = () => {
        'worklet';

        translateY.value = withTiming(getTopHinge(), {
            duration: scrollAnimationTiming,
        });
    };
    const toggleVerticalListToBottomHinge = () => {
        'worklet';

        translateY.value = withTiming(
            //replace logic with 2 function calls replicates behavior for both behavior
            maxTranslateY(),
            {
                duration: scrollAnimationTiming,
            }
        );
    };
    const toggleVerticalListToHinge = (location) => {
        'worklet';

        switch (location) {
            case TOP:
                toggleVerticalListToTopHinge();
                return;
            case BOTTOM:
                toggleVerticalListToBottomHinge();
                return;
            default:
                return;
        }
    };
    const toggleListToHingeAfterRefresh = runOnUI(() => {
        'worklet';

        if (
            !isVerticalListWithinHinge() &&
            getVerticalOutOfHingeLocation() === TOP &&
            !scrollingVertical.value
        ) {
            toggleVerticalListToTopHinge();
        }
    });
    const disableRefreshingActive = runOnUI(() => {
        'worklet';

        refreshingActive.value = false;
    });
    const isVerticalOuboundAtTop = (translateY) => {
        'worklet';

        return translateY > 0;
    };
    const isVerticalOuboundAtBottom = (translateY) => {
        'worklet';

        return translateY < maxTranslateY();
    };
    const isTranslateYOverBounds = (translateY) => {
        'worklet';

        return (
            isVerticalOuboundAtTop(translateY) || translateY < maxTranslateY()
        );
    };
    const getAccumulatedElasticityFactor = (steps) => {
        'worklet';

        return new Array(steps)
            .fill()
            .map((_, i) => (0.5 - 0.05 * i).toFixed(2) * 1)
            .reduce((prev, cur) => prev + cur, 0);
    };
    const getElasticityPercentile = (stepsMoved) => {
        'worklet';

        return (0.5 - stepsMoved * 0.05).toFixed(2);
    };
    const getElasticity = (view, outboundOffset) => {
        'worklet';

        const signFactor = outboundOffset >= 0 ? 1 : -1;
        const loopSteps = Math.abs(outboundOffset) / getTenthOfTotalView(view);
        if (loopSteps >= 10) {
            return (
                ((loopSteps - 10) * 0.05 + getAccumulatedElasticityFactor(10)) *
                getTenthOfTotalView(view) *
                signFactor
            );
        } else {
            const flooredLoopSteps = Math.floor(loopSteps);
            const decimal = loopSteps - flooredLoopSteps;
            return (
                (decimal * getElasticityPercentile(flooredLoopSteps) +
                    getAccumulatedElasticityFactor(flooredLoopSteps)) *
                getTenthOfTotalView(view) *
                signFactor
            );
        }
    };
    const getTranslateYOutboundOffset = (translateY) => {
        'worklet';

        return isVerticalOuboundAtTop(translateY)
            ? translateY
            : isVerticalOuboundAtBottom(translateY)
            ? translateY - maxTranslateY()
            : 0;
    };
    const getTranslateYWithElasticOffset = (translateY) => {
        'worklet';

        return (
            (isVerticalOuboundAtBottom(translateY) ? maxTranslateY() : 0) +
            getElasticity(VERTICAL, getTranslateYOutboundOffset(translateY))
        );
    };
    const triggerRefresh = () => {
        // relies on react implementation of updating jointly called state updates together
        onRefresh();
        setTriggeredOnRefresh(true);
    };
    const handleVerticalListOnUpdate = (translationY) => {
        'worklet';

        //keeps constant track of translationY for reference during panning
        const newTranslateY = translateYTemp.value + translationY;
        if (isTranslateYOverBounds(newTranslateY)) {
            translateY.value = getTranslateYWithElasticOffset(newTranslateY);
        } else {
            translateY.value = newTranslateY;
        }
    };
    const getMaxTranslateX = () => {
        'worklet';

        return -width;
    };
    const isTranslateOverBoundsAtLeft = (translateX) => {
        'worklet';

        return translateX > 0;
    };
    const isTranslateOverBoundsAtRight = (translateX) => {
        'worklet';

        return translateX < -width;
    };
    const isTranslateXOverBounds = (translateX) => {
        'worklet';

        return (
            isTranslateOverBoundsAtLeft(translateX) ||
            translateX < getMaxTranslateX()
        );
    };
    const getTranslateXOutboundOffset = (translateX) => {
        'worklet';

        return isTranslateOverBoundsAtLeft(translateX)
            ? translateX
            : isTranslateOverBoundsAtRight(translateX)
            ? translateX - getMaxTranslateX()
            : 0;
    };
    const getTranslateXWithElasticOffset = (translateX) => {
        'worklet';

        return (
            (isTranslateOverBoundsAtRight(translateX)
                ? getMaxTranslateX()
                : 0) +
            getElasticity(HORIZONTAL, getTranslateXOutboundOffset(translateX))
        );
    };
    const isHorizontalListHinged = () => {
        'worklet';

        return translateX.value % width === 0;
    };
    const getClosestTranslateXHinge = () => {
        'worklet';

        return isTranslateOverBoundsAtLeft(translateX.value)
            ? 0
            : Math.ceil(translateX.value / width) * width -
                  (Math.abs(translateX.value % width) / width > 0.5
                      ? width
                      : 0);
    };
    const toggleHorizontalListToHinge = () => {
        'worklet';

        if (!isHorizontalListHinged()) {
            translateX.value = withTiming(getClosestTranslateXHinge(), {
                duration: scrollAnimationTiming,
            });
        }
    };
    const handleHorizontalListOnUpdate = (translationX) => {
        'worklet';

        const newTranslateX = translateXTemp.value + translationX;

        if (isTranslateXOverBounds(newTranslateX)) {
            translateX.value = getTranslateXWithElasticOffset(newTranslateX);
        } else {
            translateX.value = newTranslateX;
        }
    };

    //animated styles
    const translateYStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: Math.max(translateY.value, -topCompHeight.value),
            },
        ],
    }));
    const listContainerStyle = useAnimatedStyle(() => {
        return {
            //may change implementation to change with view to test impact
            height: totalViewHeight.value, //list viewport, does not influence layout
            transform: [{ translateX: translateX.value }],
        };
    }, []);
    const list1ContentContainerStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    translateY: Math.min(
                        translateL1.value + topCompHeight.value,
                        0
                    ),
                },
            ],
        }),
        []
    );
    const list2ContentContainerStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    translateY: Math.min(
                        translateL2.value + topCompHeight.value,
                        0
                    ),
                },
            ],
        }),
        []
    );

    const tapGestureHandler = Gesture.Manual()
        .onTouchesDown(() => {
            //stops any active scrolling animation
            cancelAnimation(translateY);
            cancelAnimation(translateX);
        })
        .onTouchesUp(() => {
            toggleHorizontalListToHinge();
            if (
                //toggle vertical list if Hanging
                !isVerticalListWithinHinge()
            ) {
                toggleVerticalListToHinge(getVerticalOutOfHingeLocation());
            }
        }); //add condition for update
    const panGestureHandler = Gesture.Pan()
        .onStart(() => {
            //update translateYTemp value such that it reflects the scroll position while prioritizing the scroll position of the active nested vertical list when nested list scroll offset > 0
            translateYTemp.value = getCurrentTranslateY();
            //update translateXTemp for future reference during gestures
            translateXTemp.value = translateX.value;
        })
        .onUpdate(({ translationX, translationY, y, velocityX, velocityY }) => {
            if (!scrollingVertical.value && !scrollingHorizontal.value) {
                if (
                    //if more efforts were made in vertical direction prioritizing vertical scroll over horizontal.
                    Math.abs(translationY) > Math.abs(translationX) ||
                    Math.abs(velocityY) > Math.abs(velocityX)
                ) {
                    //release horizontal to hinge if hanging
                    if (!isHorizontalListHinged()) {
                        translateX.value = getClosestTranslateXHinge();
                    }

                    scrollingVertical.value = true;
                    handleVerticalListOnUpdate(translationY);
                } else if (
                    //if more efforts were made in horizontal direction && if in horizontal list section
                    (Math.abs(translationX) > Math.abs(translationY) ||
                        Math.abs(velocityX) > Math.abs(velocityY)) &&
                    y - translateY.value > topCompHeight.value //within horizontal list section
                ) {
                    //release vertical if hanging &&
                    // only if the outbound offset not topComp of list shorter than totalView
                    if (
                        !isVerticalListWithinHinge() &&
                        (!isListShorterThanTotalView() ||
                            (isListShorterThanTotalView() &&
                                getTranslateYOutboundOffset(
                                    getCurrentTranslateY()
                                ) < -topCompHeight.value))
                    ) {
                        toggleVerticalListToHinge(
                            getVerticalOutOfHingeLocation()
                        );
                    }

                    scrollingHorizontal.value = true;
                    handleHorizontalListOnUpdate(translationX);
                }
            } else {
                if (scrollingVertical.value) {
                    handleVerticalListOnUpdate(translationY);
                } else if (scrollingHorizontal.value) {
                    handleHorizontalListOnUpdate(translationX);
                }
            }
        })
        .onEnd(({ velocityY, velocityX }) => {
            if (scrollingVertical.value) {
                scrollingVertical.value = false;
                translateYTemp.value = 0;

                //checks if translateY value ripe enough to trigger refresh

                if (
                    !refreshing &&
                    !refreshingActive.value &&
                    translateY.value >= minRefreshDistance
                ) {
                    refreshingActive.value = true;
                    runOnJS(triggerRefresh)();
                }

                if (!isVerticalListWithinHinge()) {
                    toggleVerticalListToHinge(getVerticalOutOfHingeLocation());
                } else {
                    if (
                        //restricts momentum scroll to only obvious attempts
                        Math.abs(velocityY) > 100
                    ) {
                        const topHinge = refreshingActive.value
                            ? minRefreshDistance
                            : 0;
                        translateY.value = withDecay({
                            velocity: velocityY,
                            clamp: [maxTranslateY(), topHinge],
                        });
                    }
                }
            } else if (scrollingHorizontal.value) {
                translateXTemp.value = 0;
                scrollingHorizontal.value = false;

                if (
                    //scroll is obvious & list within boundary
                    Math.abs(velocityX) > 400 &&
                    !isTranslateXOverBounds(translateX.value)
                ) {
                    translateX.value = withTiming(velocityX > 0 ? 0 : -width, {
                        duration: scrollAnimationTiming,
                    });
                } else {
                    toggleHorizontalListToHinge();
                }
            }
        });

    useEffect(() => {
        'worklet';

        if (!refreshing) {
            disableRefreshingActive();
            toggleListToHingeAfterRefresh();
        }
    }, [refreshing]);

    useEffect(() => {
        'worklet';

        if (triggeredOnRefresh) {
            if (triggeredOnRefresh != refreshing) {
                disableRefreshingActive();
                toggleListToHingeAfterRefresh();
            }
            setTriggeredOnRefresh(false);
        }
    }, [triggeredOnRefresh]);

    console.log('some state changed');

    return (
        <View
            onLayout={({
                nativeEvent: {
                    layout: { height, width },
                },
            }) => {
                totalViewHeight.value = height;
                totalViewWidth.value = width;
            }}
            style={[styles.container]}
        >
            <GestureContainer style={styles.container}>
                {/* @ts-ignore */}
                <GestureDetector
                    gesture={Gesture.Exclusive(
                        panGestureHandler,
                        tapGestureHandler
                    )}
                >
                    <Animated.View style={[styles.container]}>
                        <RefreshControl
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: width / 2 - 30 / 2,
                                width: 30,
                                height: 30,
                            }}
                        />

                        <Animated.View
                            style={[styles.container, translateYStyle]}
                        >
                            <View
                                onLayout={({
                                    nativeEvent: {
                                        layout: { height },
                                    },
                                }) => {
                                    topCompHeight.value = height;
                                }}
                            >
                                {topComp}
                            </View>
                            <Animated.View
                                style={[
                                    {
                                        flexDirection: 'row',
                                        width: width * 2,
                                    },
                                    listContainerStyle,
                                ]}
                            >
                                <Animated.View
                                    style={{
                                        width: width,
                                    }}
                                >
                                    <Animated.View
                                        style={list1ContentContainerStyle}
                                    >
                                        {list1.map(renderList)}
                                    </Animated.View>
                                </Animated.View>
                                <Animated.View
                                    style={{
                                        width: width,
                                    }}
                                >
                                    <Animated.View
                                        onLayout={(e) =>
                                            console.log(e.nativeEvent)
                                        }
                                        style={list2ContentContainerStyle}
                                    >
                                        {list2.map(renderList)}
                                    </Animated.View>
                                </Animated.View>
                            </Animated.View>
                        </Animated.View>
                    </Animated.View>
                </GestureDetector>
            </GestureContainer>
        </View>
    );
}
