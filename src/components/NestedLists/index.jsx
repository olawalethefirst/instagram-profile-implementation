import React, { useEffect, useCallback, useState } from "react";
import { View, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  cancelAnimation,
  useDerivedValue,
  withTiming,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";

import {
  GestureDetector,
  Gesture,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import PropTypes from "prop-types";
import styles from "../../screens/styles";
import RefreshControl from "../RefreshControl";
import NestedHorizontalList from "./NestedHorizontalList";
import getEquivalentOutboundFromOffset from "../../helperFunctions/getEquivalentOutboundFromOffset";
import getElasticity from "../../helperFunctions/getElasticity";

const minRefreshDistance = 40;
const scrollAnimationTiming = 100;
const TOP = "TOP";
const BOTTOM = "BOTTOM";

const GestureContainer =
  Platform.OS === "android" ? gestureHandlerRootHOC(View) : View;

function NestedLists({
  HeaderComponent,
  renderList,
  renderListItem,
  refreshing,
  onRefresh,
  data,

  // RefreshControl
}) {
  // state
  const [triggeredOnRefresh, setTriggeredOnRefresh] = useState(false);
  const [nestedListsLength, setNestedListsLength] = useState(
    new Array(data.length).fill(0)
  );

  // animation values and functions
  const totalViewHeight = useSharedValue(0);
  const totalViewWidth = useSharedValue(0);
  const totalViewHeightTenth = useDerivedValue(
    () => totalViewHeight.value * 0.1
  );
  const totalViewWidthTenth = useDerivedValue(() => totalViewWidth.value * 0.1);
  const topCompHeight = useSharedValue(0);
  const scrollingVertical = useSharedValue(false);
  const scrollingHorizontal = useSharedValue(false);
  const translateYTemp = useSharedValue(0);
  const translateXTemp = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateYsHolder = useSharedValue(new Array(data.length + 1).fill(0));
  const translateX = useSharedValue(0);
  const refreshingActive = useSharedValue(false);
  const getActiveNestedListIndex = useCallback(() => {
    "worklet";

    if (translateX.value >= 0 || totalViewWidth.value === 0 || data.length <= 0)
      return 0;

    return Math.min(
      Math.abs(Math.round(translateX.value / totalViewWidth.value)),
      data.length
    );
  }, []);
  const getTranslateYsHolder = () => {
    "worklet";

    return translateYsHolder.value;
  };
  const updateTranslateYsHolder = (newValue) => {
    "worklet";

    translateYsHolder.value = newValue;
  };
  const updateNestedListsLength = useCallback((i, newLength) => {
    setNestedListsLength((state) =>
      state.map((length, i2) => (i2 === i ? newLength : length))
    );
  }, []);
  const refreshAnimationProgress = useDerivedValue(() =>
    Math.max(
      0,
      (
        Math.min(
          getElasticity(totalViewHeightTenth.value, translateY.value) /
            minRefreshDistance,
          1
        ) * 100
      ).toFixed(1) - 0
    )
  );
  const getCurrentMaxTranslateY = useCallback(() => {
    "worklet";

    // negates maximum translateY for animational direction
    return -Math.max(
      topCompHeight.value +
        nestedListsLength[getActiveNestedListIndex()] -
        totalViewHeight.value,
      0
    );
  }, [getActiveNestedListIndex, nestedListsLength]);
  const getTopHinge = () => {
    // marked for possible relocation

    "worklet";

    return refreshingActive.value ? minRefreshDistance : 0;
  };
  const getTopHingeOutboundEq = () => {
    // marked for possible relocation

    "worklet";

    return refreshingActive.value
      ? getEquivalentOutboundFromOffset(
          totalViewHeightTenth.value,
          minRefreshDistance
        )
      : 0;
  };

  const toggleVerticalListToTopHinge = () => {
    "worklet";

    translateY.value = withTiming(getTopHingeOutboundEq(), {
      duration: scrollAnimationTiming,
    });
  };
  const toggleVerticalListToBottomHinge = () => {
    "worklet";

    translateY.value = withTiming(getCurrentMaxTranslateY(), {
      duration: scrollAnimationTiming,
    });
  };
  const toggleVerticalListToHinge = (location) => {
    "worklet";

    switch (location) {
      case TOP:
        toggleVerticalListToTopHinge();
        break;
      case BOTTOM:
        toggleVerticalListToBottomHinge();
        break;
      default:
        break;
    }
  };
  const disableRefreshingActive = () => {
    "worklet";

    refreshingActive.value = false;
  };
  const isVerticalOuboundAtTop = useCallback((_translateY) => {
    "worklet";

    return _translateY > 0;
  }, []);
  const isVerticalOuboundAtBottom = useCallback(
    (_translateY) => {
      "worklet";

      return _translateY < getCurrentMaxTranslateY();
    },
    [getCurrentMaxTranslateY]
  );
  const isTranslateYOverBounds = useCallback(
    (_translateY) => {
      "worklet";

      return (
        isVerticalOuboundAtTop(_translateY) ||
        isVerticalOuboundAtBottom(_translateY)
      );
    },
    [isVerticalOuboundAtTop, isVerticalOuboundAtBottom]
  );
  const getTranslateYOutboundOffset = useCallback(
    (_translateY) => {
      "worklet";

      // eslint-disable-next-line no-nested-ternary
      if (isVerticalOuboundAtTop(_translateY)) {
        return _translateY;
      }
      if (isVerticalOuboundAtBottom(_translateY)) {
        return _translateY - getCurrentMaxTranslateY();
      }
      return 0;
    },
    [isVerticalOuboundAtTop, isVerticalOuboundAtBottom, getCurrentMaxTranslateY]
  );
  const getTranslateYWithElasticOffset = useCallback(
    (_translateY) => {
      "worklet";

      return (
        (isVerticalOuboundAtBottom(_translateY)
          ? getCurrentMaxTranslateY()
          : 0) +
        getElasticity(
          totalViewHeightTenth.value,
          getTranslateYOutboundOffset(_translateY)
        )
      );
    },
    [
      isVerticalOuboundAtBottom,
      getCurrentMaxTranslateY,
      getTranslateYOutboundOffset,
    ]
  );
  const translateYsRaw = useDerivedValue(() => {
    const activeListTranslateYIndex = getActiveNestedListIndex() + 1;

    const newValue = getTranslateYsHolder().map((val, i) => {
      if (i === 0) {
        return Math.max(translateY.value, -topCompHeight.value);
      }

      if (translateY.value >= -topCompHeight.value) return 0;

      if (i === activeListTranslateYIndex) {
        return Math.min(translateY.value + topCompHeight.value, 0);
      }

      return val;
    });

    updateTranslateYsHolder(newValue);

    return newValue;
  }, [isTranslateYOverBounds, getTranslateYWithElasticOffset]);
  const translateYs = useDerivedValue(() => {
    const activeListTranslateYIndex = getActiveNestedListIndex() + 1;

    const effectiveTranslateY = isTranslateYOverBounds(translateY.value)
      ? getTranslateYWithElasticOffset(translateY.value)
      : translateY.value;

    const newValue = getTranslateYsHolder().map((val, i) => {
      if (i === 0) {
        return Math.max(effectiveTranslateY, -topCompHeight.value);
      }

      if (effectiveTranslateY >= -topCompHeight.value) return 0;

      if (i === activeListTranslateYIndex) {
        return Math.min(effectiveTranslateY + topCompHeight.value, 0);
      }

      return val;
    });

    updateTranslateYsHolder(newValue);

    return newValue;
  }, [isTranslateYOverBounds, getTranslateYWithElasticOffset]);
  const getCurrentTranslateY = () => {
    "worklet";

    return (
      translateYs.value[0] + translateYs.value[getActiveNestedListIndex() + 1]
    );
  };
  const getCurrentTranslateYRaw = () => {
    "worklet";

    return (
      translateYsRaw.value[0] +
      translateYsRaw.value[getActiveNestedListIndex() + 1]
    );
  };
  const isVerticalListWithinHinge = () => {
    "worklet";

    return (
      getTopHinge() >= translateYs.value[0] &&
      getCurrentTranslateY() >= getCurrentMaxTranslateY()
    );
  };
  const getVerticalOutOfHingeLocation = () => {
    "worklet";

    if (translateYs.value[0] > getTopHinge()) {
      return TOP;
    }
    if (getCurrentTranslateY() < getCurrentMaxTranslateY()) {
      return BOTTOM;
    }
    return null;
  };
  const toggleListToHingeAfterRefresh = () => {
    "worklet";

    if (
      !isVerticalListWithinHinge() &&
      getVerticalOutOfHingeLocation() === TOP &&
      !scrollingVertical.value
    ) {
      toggleVerticalListToTopHinge();
    }
  };
  const cancelRefreshingAnimation = () => {
    "worklet";

    disableRefreshingActive();
    toggleListToHingeAfterRefresh();
  };

  const triggerRefresh = () => {
    // relies on react implementation of updating jointly called state updates together
    onRefresh();
    setTriggeredOnRefresh(true);
  };
  const handleVerticalListOnUpdate = (translationY) => {
    "worklet";

    // changing to just updating
    translateY.value = translateYTemp.value + translationY;
  };
  const getMaxTranslateX = () => {
    "worklet";

    // negative reflects direction for animation translation
    return -(Math.max(data.length - 1, 0) * totalViewWidth.value);
  };
  const isTranslateOverBoundsAtLeft = (_translateX) => {
    "worklet";

    return (_translateX ?? translateX.value) > 0;
  };
  const isTranslateOverBoundsAtRight = (_translateX) => {
    "worklet";

    return (_translateX ?? translateX.value) < getMaxTranslateX();
  };
  const isTranslateXOverBounds = (_translateX) => {
    "worklet";

    return (
      isTranslateOverBoundsAtLeft(_translateX) ||
      isTranslateOverBoundsAtRight(_translateX)
    );
  };
  const getTranslateXOutboundOffset = (_translateX) => {
    "worklet";

    if (isTranslateOverBoundsAtLeft(_translateX)) {
      return _translateX;
    }
    if (isTranslateOverBoundsAtRight(_translateX)) {
      return _translateX - getMaxTranslateX();
    }
    return 0;
  };
  const getTranslateXWithElasticOffset = (_translateX) => {
    "worklet";

    return (
      (isTranslateOverBoundsAtRight(_translateX) ? getMaxTranslateX() : 0) +
      getElasticity(
        totalViewWidthTenth.value,
        getTranslateXOutboundOffset(_translateX)
      )
    );
  };
  const isHorizontalListHinged = () => {
    "worklet";

    if (totalViewWidth.value === 0) return true;

    return translateX.value % totalViewWidth.value === 0;
  };
  const getClosestTranslateXHinge = () => {
    "worklet";

    if (totalViewWidth.value === 0) return 0;

    return isTranslateOverBoundsAtLeft(translateX.value)
      ? 0
      : Math.max(
          Math.ceil(translateX.value / totalViewWidth.value) *
            totalViewWidth.value +
            Math.round(
              (translateX.value % totalViewWidth.value) / totalViewWidth.value
            ) *
              totalViewWidth.value,
          getMaxTranslateX()
        );
  };
  const toggleHorizontalListToHinge = () => {
    "worklet";

    if (!isHorizontalListHinged()) {
      translateX.value = withTiming(getClosestTranslateXHinge(), {
        duration: scrollAnimationTiming,
      });
    }
  };
  const handleHorizontalListOnUpdate = (translationX) => {
    "worklet";

    const newTranslateX = translateXTemp.value + translationX;

    if (isTranslateXOverBounds(newTranslateX)) {
      translateX.value = getTranslateXWithElasticOffset(newTranslateX);
    } else {
      translateX.value = newTranslateX;
    }
  };

  // animated styles
  const translateYStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: translateYs.value[0],
        },
      ],
    }),
    []
  );
  const listContainerStyle = useAnimatedStyle(
    () => ({
      // list viewport, does not influence layout
      maxHeight: totalViewHeight.value,
      transform: [{ translateX: translateX.value }],
    }),
    [data]
  );

  // gesture responders
  const tapGestureHandler = Gesture.Manual()
    .onTouchesDown(() => {
      // stops any active scrolling animation
      cancelAnimation(translateY);
      cancelAnimation(translateX);
    })
    .onTouchesUp(() => {
      toggleHorizontalListToHinge();
      if (
        // toggle vertical list if Hanging
        !isVerticalListWithinHinge()
      ) {
        toggleVerticalListToHinge(getVerticalOutOfHingeLocation());
      }
    });
  const panGestureHandler = Gesture.Pan()
    .onStart(() => {
      // update translateYTemp value for future reference during panning updates
      translateYTemp.value = getCurrentTranslateYRaw();
      // update translateXTemp for future reference during panning updates
      translateXTemp.value = translateX.value;
    })
    .onUpdate(({ translationX, translationY, y, velocityX, velocityY }) => {
      if (!scrollingVertical.value && !scrollingHorizontal.value) {
        if (
          // if more efforts were made in vertical direction prioritizing vertical
          // scroll over horizontal.
          Math.abs(translationY) > Math.abs(translationX) ||
          Math.abs(velocityY) > Math.abs(velocityX)
        ) {
          // release horizontal to hinge if hanging
          if (!isHorizontalListHinged()) {
            translateX.value = getClosestTranslateXHinge();
          }

          scrollingVertical.value = true;
          handleVerticalListOnUpdate(translationY);
        } else if (
          // if more efforts were made in horizontal direction && if in horizontal list section
          (Math.abs(translationX) > Math.abs(translationY) ||
            Math.abs(velocityX) > Math.abs(velocityY)) &&
          y - translateY.value > topCompHeight.value // within horizontal list section
        ) {
          // release vertical if hanging &&
          // only if the outbound offset is not topComp of lists shorter than totalView
          if (!isVerticalListWithinHinge()) {
            if (getCurrentMaxTranslateY() > 0) {
              toggleVerticalListToHinge(getVerticalOutOfHingeLocation());
            } else {
              const outboundOffset = getTranslateYOutboundOffset(
                getCurrentTranslateY()
              );
              if (outboundOffset < -topCompHeight.value || outboundOffset > 0) {
                toggleVerticalListToHinge(getVerticalOutOfHingeLocation());
              }
            }
          }

          scrollingHorizontal.value = true;
          handleHorizontalListOnUpdate(translationX);
        }
      } else if (scrollingVertical.value) {
        handleVerticalListOnUpdate(translationY);
      } else if (scrollingHorizontal.value) {
        handleHorizontalListOnUpdate(translationX);
      }
    })
    .onEnd(({ velocityY, velocityX }) => {
      if (scrollingVertical.value) {
        scrollingVertical.value = false;
        translateYTemp.value = 0;

        // checks refresh conditions
        if (
          !refreshing &&
          !refreshingActive.value &&
          getCurrentTranslateY() >= minRefreshDistance
        ) {
          refreshingActive.value = true;
          runOnJS(triggerRefresh)();
        }

        if (!isVerticalListWithinHinge()) {
          toggleVerticalListToHinge(getVerticalOutOfHingeLocation());
        } else if (
          // restricts momentum scroll to only obvious attempts
          Math.abs(velocityY) > 100
        ) {
          translateY.value = withDecay({
            velocity: velocityY,
            clamp: [getCurrentMaxTranslateY(), getTopHingeOutboundEq()],
          });
        }
      } else if (scrollingHorizontal.value) {
        translateXTemp.value = 0;
        scrollingHorizontal.value = false;

        if (
          // scroll momentum is powerful enough & list within boundary
          Math.abs(velocityX) > 400 &&
          !isTranslateXOverBounds()
        ) {
          translateX.value = withTiming(
            velocityX > 0
              ? Math.min(
                  0,
                  translateX.value - (translateX.value % totalViewWidth.value)
                )
              : Math.max(
                  getMaxTranslateX(),
                  translateX.value -
                    (translateX.value % totalViewWidth.value) -
                    totalViewWidth.value
                ),
            {
              duration: scrollAnimationTiming,
            }
          );
        } else {
          toggleHorizontalListToHinge();
        }
      }
    });

  useEffect(() => {
    if (!refreshing) {
      runOnUI(cancelRefreshingAnimation)();
    }
  }, [refreshing]);
  useEffect(() => {
    if (triggeredOnRefresh && triggeredOnRefresh != refreshing) {
      runOnUI(cancelRefreshingAnimation)();
      setTriggeredOnRefresh(false);
    }
  }, [triggeredOnRefresh, refreshing]);

  // console.log('some state changed', nestedListsLength);

  return (
    <View
      collapsable={false}
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
          gesture={Gesture.Exclusive(panGestureHandler, tapGestureHandler)}
        >
          <Animated.View collapsable={false} style={[styles.container]}>
            <RefreshControl
              style={{
                position: "absolute",
                top: 5,
                left: totalViewWidth.value / 2 - 25 / 2,
                height: 25,
                aspectRatio: 1,
              }}
              refreshAnimationProgress={refreshAnimationProgress}
              refreshingActive={refreshingActive}
              refreshing={refreshing}
            />

            <Animated.View
              collapsable={false}
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
                {HeaderComponent ? <HeaderComponent /> : HeaderComponent}
              </View>
              <Animated.View
                collapsable={false}
                style={[
                  {
                    flexDirection: "row",
                  },
                  listContainerStyle,
                ]}
              >
                <NestedHorizontalList
                  data={data}
                  updateNestedListsLength={updateNestedListsLength}
                  topCompHeight={topCompHeight}
                  translateYs={translateYs}
                  renderNestedListItem={renderListItem}
                  totalViewWidth={totalViewWidth}
                />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </GestureContainer>
    </View>
  );
}

NestedLists.defaultProps = {
  HeaderComponent: null,
};

NestedLists.propTypes = {
  HeaderComponent: PropTypes.func,
  // renderList: ,
  // renderListItem,
  // refreshing,
  // onRefresh,
  // data,
};

export default React.memo(NestedLists);
