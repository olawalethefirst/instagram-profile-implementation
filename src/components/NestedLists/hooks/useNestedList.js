import { useEffect, useCallback, useState, useRef, useMemo } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  cancelAnimation,
  useDerivedValue,
  withTiming,
  runOnJS,
  runOnUI,
  useAnimatedReaction,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import getInversedElasticity from "../helperFunctions/getInversedElasticity";
import getElasticity from "../helperFunctions/getElasticity";
import isNumber from "../helperFunctions/isNumber";

const minRefreshDistance = 40;
const scrollAnimationTiming = 150;
const TOP = "TOP";
const BOTTOM = "BOTTOM";

// to do - track data.length for change, if change occurs, throw error for wrong update of data / number of nested lists
// order of nested lists must be consistent to prevent unusual behaviour in dom

const useNestedList = (
  data,
  refreshing,
  onRefresh,
  useReanimatedUIThread,
  onVerticalScroll,
  onHorizontalScroll,
  onEndReached,
  onEndReachedThreshold
) => {
  // refs
  const nestedListsCount = useRef(data.length);

  // states
  const [triggeredOnRefresh, setTriggeredOnRefresh] = useState(null);

  // sharedValues
  const totalViewHeight = useSharedValue(0);
  const totalViewWidth = useSharedValue(0);
  const headerHeight = useSharedValue(0);
  const scrollingVertical = useSharedValue(false);
  const scrollingHorizontal = useSharedValue(false);
  const panTranslateY = useSharedValue(0);
  const panTranslationY = useSharedValue(0);
  const panTranslationX = useSharedValue(0);
  const stickyHeaderHeight = useSharedValue(0);
  const nestedTranslateYs = useSharedValue(
    new Array(nestedListsCount.current).fill(0)
  );
  const panTranslateX = useSharedValue(0);
  const refreshingActive = useSharedValue(false);
  const nestedListsLength = useSharedValue(
    new Array(nestedListsCount.current).fill(0)
  );
  const endOfListThresholdReached = useSharedValue(
    new Array(nestedListsCount.current).fill(false)
  );
  const UIThreadData = useSharedValue(data);
  const UIThreadFunctionsRef = useSharedValue({
    onRefresh,
    onVerticalScroll,
    onHorizontalScroll,
    onEndReached,
  });

  // derivedValues && heperFucntions
  const totalViewHeightTenth = useDerivedValue(
    () => totalViewHeight.value * 0.1,
    []
  );
  const totalViewWidthTenth = useDerivedValue(
    () => totalViewWidth.value * 0.1,
    []
  );
  const onEndReachedDistance = useDerivedValue(
    () => totalViewHeight.value * (1 + onEndReachedThreshold),
    []
  );
  const activeNestedListIndex = useDerivedValue(() => {
    "worklet";

    if (totalViewWidth.value === 0 || nestedListsCount.current === 0) return 0;

    return Math.max(
      0,
      Math.min(
        nestedListsCount.current - 1,
        Math.round(panTranslateX.value / totalViewWidth.value)
      )
    );
  }, []);
  const currentTotalListLength = useDerivedValue(
    () =>
      headerHeight.value +
      stickyHeaderHeight.value +
      nestedListsLength.value[activeNestedListIndex.value],
    []
  );
  const currentEndOfListThresholdReached = useDerivedValue(
    () => endOfListThresholdReached.value[activeNestedListIndex.value],
    []
  );
  const getActiveNestedListIndex = useCallback(() => {
    "worklet";

    return activeNestedListIndex.value;
  }, [activeNestedListIndex]);
  const getTranslateY = useCallback(
    (nestedListIndex) => {
      "worklet";

      return nestedTranslateYs.value[nestedListIndex];
    },
    [nestedTranslateYs]
  );
  const getCurrentTranslateY = useCallback(() => {
    "worklet";

    return getTranslateY(activeNestedListIndex.value);
  }, [activeNestedListIndex, getTranslateY]);
  const getMaxTranslateY = useCallback(
    (nestedListIndex) => {
      "worklet";

      return Math.max(
        headerHeight.value +
          stickyHeaderHeight.value +
          nestedListsLength.value[nestedListIndex] -
          totalViewHeight.value,
        0
      );
    },
    [headerHeight, stickyHeaderHeight, nestedListsLength, totalViewHeight]
  );
  const updatePanTranslateY = useCallback(
    (newPanTranslateY) => {
      "worklet";

      panTranslateY.value = newPanTranslateY;
    },
    [panTranslateY]
  );
  const getActiveListMaxTranslateY = useCallback(() => {
    "worklet";

    return getMaxTranslateY(activeNestedListIndex.value);
  }, [getMaxTranslateY, activeNestedListIndex]);
  const getUnElasticValue = useCallback((tenthOfView, offset) => {
    "worklet";

    if (offset === 0) return 0;

    const signFactor = offset / Math.abs(offset);
    const elasticity = Math.abs(offset / tenthOfView);

    return signFactor * tenthOfView * getInversedElasticity(elasticity);
  }, []);
  const getUnElasticTopHinge = useCallback(() => {
    "worklet";

    return refreshingActive.value
      ? getUnElasticValue(totalViewHeightTenth.value, -minRefreshDistance)
      : 0;
  }, [refreshingActive, getUnElasticValue, totalViewHeightTenth]);
  const updateTotalViewLayout = useCallback(
    ({
      nativeEvent: {
        layout: { height, width },
      },
    }) => {
      runOnUI(() => {
        "worklet";

        totalViewHeight.value = height;
        totalViewWidth.value = width;
      })();
    },
    [totalViewHeight, totalViewWidth]
  );
  const updateTranslationY = useCallback(
    (newTranslationY) => {
      "worklet";

      panTranslationY.value = newTranslationY;
    },
    [panTranslationY]
  );
  const resetTranslationY = useCallback(() => {
    "worklet";

    panTranslationY.value = 0;
  }, [panTranslationY]);
  const getOldTranslationY = useCallback(() => {
    "worklet";

    return panTranslationY.value;
  }, [panTranslationY]);
  const updateTranslationX = useCallback(
    (newTranslationX) => {
      "worklet";

      panTranslationX.value = newTranslationX;
    },
    [panTranslationX]
  );
  const resetTranslationX = useCallback(() => {
    "worklet";

    panTranslationX.value = 0;
  }, [panTranslationX]);
  const getOldTranslationX = useCallback(() => {
    "worklet";

    return panTranslationX.value;
  }, [panTranslationX]);
  const updateNestedTranslateYs = useCallback(
    (nestedListIndex, newNestedTranslateY) => {
      "worklet";

      nestedTranslateYs.value = nestedTranslateYs.value.map(
        (nestedTranslateY, i) =>
          i === nestedListIndex ? newNestedTranslateY : nestedTranslateY
      );
    },
    [nestedTranslateYs]
  );
  const calculateMaximumHeaderTranslationY = useCallback(
    (value) => {
      "worklet";

      return Math.min(value, headerHeight.value);
    },
    [headerHeight]
  );
  const updateHeaderHeight = useCallback(
    ({
      nativeEvent: {
        layout: { height },
      },
    }) => {
      runOnUI(() => {
        "worklet";

        headerHeight.value = height;
      })();
    },
    [headerHeight]
  );
  const updateStickyHeaderHeight = useCallback(
    ({
      nativeEvent: {
        layout: { height },
      },
    }) => {
      runOnUI(() => {
        "worklet";

        stickyHeaderHeight.value = height;
      })();
    },
    [stickyHeaderHeight]
  );
  const toggleVerticalListToTopHinge = useCallback(() => {
    "worklet";

    panTranslateY.value = withTiming(getUnElasticTopHinge(), {
      duration: scrollAnimationTiming,
    });
  }, [panTranslateY, getUnElasticTopHinge]);
  const toggleVerticalListToBottomHinge = useCallback(() => {
    "worklet";

    panTranslateY.value = withTiming(getActiveListMaxTranslateY(), {
      duration: scrollAnimationTiming,
    });
  }, [panTranslateY, getActiveListMaxTranslateY]);
  const toggleVerticalListToHinge = useCallback(
    (location) => {
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
    },
    [toggleVerticalListToTopHinge, toggleVerticalListToBottomHinge]
  );
  const disableRefreshingActive = useCallback(() => {
    "worklet";

    refreshingActive.value = false;
  }, [refreshingActive]);
  const updateNestedListsLength = useCallback(
    (newIndex, newLength) => {
      "worklet";

      nestedListsLength.value = nestedListsLength.value.map((length, index) =>
        index === newIndex ? newLength : length
      );
    },
    [nestedListsLength]
  );
  const isVerticalListWithinHinge = useCallback(() => {
    "worklet";

    const currentTranslateY = getCurrentTranslateY();

    return (
      currentTranslateY >= getUnElasticTopHinge() &&
      currentTranslateY <= getActiveListMaxTranslateY()
    );
  }, [getUnElasticTopHinge, getCurrentTranslateY, getActiveListMaxTranslateY]);
  const getVerticalOutOfHingeLocation = useCallback(() => {
    "worklet";

    const currentTranslateY = getCurrentTranslateY();
    if (currentTranslateY < getUnElasticTopHinge()) {
      return TOP;
    }
    if (currentTranslateY > getActiveListMaxTranslateY()) {
      return BOTTOM;
    }
    return null;
  }, [getUnElasticTopHinge, getCurrentTranslateY, getActiveListMaxTranslateY]);
  const toggleListToHingeAfterRefresh = useCallback(() => {
    "worklet";

    if (getVerticalOutOfHingeLocation() === TOP && !scrollingVertical.value) {
      toggleVerticalListToTopHinge();
    }
  }, [
    getVerticalOutOfHingeLocation,
    toggleVerticalListToTopHinge,
    scrollingVertical,
  ]);
  const cancelRefreshingAnimation = useCallback(() => {
    "worklet";

    disableRefreshingActive();
    toggleListToHingeAfterRefresh();
  }, [disableRefreshingActive, toggleListToHingeAfterRefresh]);
  const triggerRefresh = useCallback(
    (nestedListIndex) => {
      // relies on react implementation of updating jointly called state updates together
      onRefresh(nestedListIndex);
      setTriggeredOnRefresh(nestedListIndex);
    },
    [onRefresh]
  );
  const handleVerticalListOnUpdate = useCallback(
    (newTranslationY) => {
      "worklet";

      // increment translateY as more content is exposed
      panTranslateY.value -= newTranslationY - getOldTranslationY();
      updateTranslationY(newTranslationY);
    },
    [panTranslateY, getOldTranslationY, updateTranslationY]
  );
  const isPanTranslateYOverBoundsAtMax = useCallback(() => {
    "worklet";

    return panTranslateY.value > getActiveListMaxTranslateY();
  }, [panTranslateY, getActiveListMaxTranslateY]);
  const isPanTranslateYOverBounds = useCallback(() => {
    "worklet";

    return panTranslateY.value < 0 || isPanTranslateYOverBoundsAtMax();
  }, [panTranslateY, isPanTranslateYOverBoundsAtMax]);
  const getClosestVerticalHingeBoundary = useCallback(() => {
    "worklet";

    const currentMaxTranslateY = getActiveListMaxTranslateY();
    return panTranslateY.value > currentMaxTranslateY
      ? currentMaxTranslateY
      : 0;
  }, [getActiveListMaxTranslateY, panTranslateY]);
  const getElasticPanTranslateY = useCallback(() => {
    "worklet";

    const boundary = getClosestVerticalHingeBoundary();

    return (
      boundary +
      getElasticity(totalViewHeightTenth.value, panTranslateY.value - boundary)
    );
  }, [getClosestVerticalHingeBoundary, panTranslateY, totalViewHeightTenth]);
  const panTranslateYEffective = useDerivedValue(() => {
    return isPanTranslateYOverBounds()
      ? getElasticPanTranslateY()
      : panTranslateY.value;
  }, [isPanTranslateYOverBounds, getElasticPanTranslateY, panTranslateY]);
  const currentUnViewedOffset = useDerivedValue(
    () => currentTotalListLength.value - panTranslateYEffective.value,
    []
  );
  const isHeaderRegion = useDerivedValue(
    () => panTranslateYEffective.value <= headerHeight.value,
    []
  );
  const headerTranslateYEffective = useDerivedValue(() =>
    Math.min(headerHeight.value, panTranslateYEffective.value)
  );
  const refreshAnimationProgress = useDerivedValue(() => {
    if (headerTranslateYEffective.value >= 0) return 0;

    return (
      Math.min(
        Math.abs(headerTranslateYEffective.value / minRefreshDistance),
        1
      ).toFixed(3) * 100
    );
  }, []);
  const outboundVerticalOffsetIsHeader = useCallback(() => {
    "worklet";

    const currentTranslateY = getCurrentTranslateY();
    return currentTranslateY <= headerHeight.value && currentTranslateY >= 0;
  }, [getCurrentTranslateY, headerHeight]);
  const getTranslateYEffectiveFromNestedEffective = useCallback(
    (nestedTranslateYEffective) => {
      "worklet";

      return nestedTranslateYEffective + headerTranslateYEffective.value;
    },
    [headerTranslateYEffective]
  );
  const getNestedEffectiveFromTranslateYEffective = useCallback(
    (translateY) => {
      "worklet";

      return translateY - headerTranslateYEffective.value;
    },
    [headerTranslateYEffective]
  );
  const panTranslateYEffectiveWithoutHeader = useDerivedValue(() => {
    "worklet";

    return Math.max(
      0,
      panTranslateYEffective.value - headerTranslateYEffective.value
    );
  }, [panTranslateYEffective, headerTranslateYEffective]);
  const updateEndOfListThresholdReached = useCallback(() => {
    "worklet";

    endOfListThresholdReached.value = endOfListThresholdReached.value.map(
      (val, index) => (index === activeNestedListIndex.value ? !val : val)
    );
  }, [endOfListThresholdReached, activeNestedListIndex]);
  const getMaxTranslateX = useCallback(() => {
    "worklet";

    return Math.max(nestedListsCount.current - 1, 0) * totalViewWidth.value;
  }, [nestedListsCount, totalViewWidth]);
  const isHorizontalListOutboundAtZero = useCallback(() => {
    "worklet";

    return panTranslateX.value < 0;
  }, [panTranslateX]);
  const isHorizontalListOutboundAtMax = useCallback(() => {
    "worklet";

    return panTranslateX.value > getMaxTranslateX();
  }, [panTranslateX, getMaxTranslateX]);
  const isHorizontalListOutbound = useCallback(() => {
    "worklet";

    return isHorizontalListOutboundAtZero() || isHorizontalListOutboundAtMax();
  }, [isHorizontalListOutboundAtZero, isHorizontalListOutboundAtMax]);
  const getCurrentHorizontalBoundary = useCallback(() => {
    "worklet";

    if (isHorizontalListOutboundAtMax()) return getMaxTranslateX();

    return 0;
  }, [isHorizontalListOutboundAtMax, getMaxTranslateX]);
  const getElasticTranslateX = useCallback(() => {
    "worklet";

    const boundary = getCurrentHorizontalBoundary();

    return (
      boundary +
      getElasticity(totalViewWidthTenth.value, panTranslateX.value - boundary)
    );
  }, [getCurrentHorizontalBoundary, totalViewWidthTenth, panTranslateX]);
  const translateXEffective = useDerivedValue(() => {
    return isHorizontalListOutbound()
      ? getElasticTranslateX()
      : panTranslateX.value;
  }, []);
  const isHorizontalListHinged = useCallback(() => {
    "worklet";

    if (totalViewWidth.value === 0) return true;

    return panTranslateX.value % totalViewWidth.value === 0;
  }, [totalViewWidth, panTranslateX]);
  const getClosestTranslateXHinge = useCallback(() => {
    "worklet";

    if (totalViewWidth.value <= 0) return 0;

    return isHorizontalListOutboundAtZero(panTranslateX.value)
      ? 0
      : Math.min(
          Math.floor(panTranslateX.value / totalViewWidth.value) *
            totalViewWidth.value +
            Math.round(
              (panTranslateX.value % totalViewWidth.value) /
                totalViewWidth.value
            ) *
              totalViewWidth.value,
          getMaxTranslateX()
        );
  }, [
    totalViewWidth,
    isHorizontalListOutboundAtZero,
    panTranslateX,
    getMaxTranslateX,
  ]);
  const toggleHorizontalListToHinge = useCallback(() => {
    "worklet";

    if (!isHorizontalListHinged()) {
      panTranslateX.value = withTiming(getClosestTranslateXHinge(), {
        duration: scrollAnimationTiming,
      });
    }
  }, [isHorizontalListHinged, panTranslateX, getClosestTranslateXHinge]);
  const handleHorizontalListOnUpdate = useCallback(
    (newTranslationX) => {
      "worklet";

      // negating negativeTranslation received when swiping lists from right to left to increment scroll position length
      panTranslateX.value -= newTranslationX - getOldTranslationX();
      updateTranslationX(newTranslationX);
    },
    [panTranslateX, getOldTranslationX, updateTranslationX]
  );
  const scrollToNestedListIndex = useCallback(
    (nestedListIndex) => {
      panTranslateX.value = withTiming(nestedListIndex * totalViewWidth.value, {
        duration: scrollAnimationTiming,
      });
    },
    [panTranslateX, totalViewWidth]
  );

  // animated styles
  const listContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -headerTranslateYEffective.value,
        },
      ],
    };
  }, []);
  const horizontalListAnimatedContainerStyle = useAnimatedStyle(() => {
    return {
      // list viewport, does not influence layout
      maxHeight: totalViewHeight.value,
      transform: [{ translateX: -translateXEffective.value }],
    };
  }, []);

  // gestureResponders
  const tapGestureHandler = useMemo(
    () =>
      Gesture.Pan()
        .manualActivation()
        .onTouchesDown(() => {
          // stops any active scrolling animation
          cancelAnimation(panTranslateY);
          cancelAnimation(panTranslateX);
        })
        .onTouchesUp(() => {
          toggleHorizontalListToHinge();
          if (
            // toggle vertical list if Hanging
            !isVerticalListWithinHinge()
          ) {
            if (!outboundVerticalOffsetIsHeader()) {
              toggleVerticalListToHinge(getVerticalOutOfHingeLocation());
            }
          }
        }),
    [
      getVerticalOutOfHingeLocation,
      isVerticalListWithinHinge,
      outboundVerticalOffsetIsHeader,
      panTranslateX,
      panTranslateY,
      toggleHorizontalListToHinge,
      toggleVerticalListToHinge,
    ]
  );
  const panGestureHandler = useMemo(
    () =>
      Gesture.Pan()
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
                panTranslateX.value = getClosestTranslateXHinge();
              }

              panTranslateY.value = getCurrentTranslateY();
              scrollingVertical.value = true;
              handleVerticalListOnUpdate(translationY);
            } else if (
              // if more efforts were made in horizontal direction && if in horizontal list section
              (Math.abs(translationX) > Math.abs(translationY) ||
                Math.abs(velocityX) > Math.abs(velocityY)) &&
              y + getCurrentTranslateY() > headerHeight.value // within horizontal list section
            ) {
              // release vertical if hanging &&
              // only if the outbound offset is not header of lists shorter than totalView
              refreshingActive.value = false;
              if (!isVerticalListWithinHinge()) {
                if (!outboundVerticalOffsetIsHeader()) {
                  panTranslateY.value = getClosestVerticalHingeBoundary();
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
            resetTranslationY();
            scrollingVertical.value = false;

            // checks refresh conditions
            if (
              !refreshing[activeNestedListIndex.value] &&
              !refreshingActive.value &&
              headerTranslateYEffective.value <= -minRefreshDistance
            ) {
              refreshingActive.value = true;
              runOnJS(triggerRefresh)(activeNestedListIndex.value);
            } else if (
              !refreshingActive.value &&
              refreshing[activeNestedListIndex.value]
            ) {
              refreshingActive.value = true;
            }

            if (!isVerticalListWithinHinge()) {
              toggleVerticalListToHinge(getVerticalOutOfHingeLocation());
            } else if (
              // restricts momentum scroll to only obvious attempts
              Math.abs(velocityY) > 100
            ) {
              panTranslateY.value = withDecay({
                velocity: -velocityY,
                clamp: [getUnElasticTopHinge(), getActiveListMaxTranslateY()],
              });
            }
          } else if (scrollingHorizontal.value) {
            resetTranslationX();
            scrollingHorizontal.value = false;

            if (
              // scroll momentum is powerful enough & list within boundary
              Math.abs(velocityX) > 400 &&
              !isHorizontalListOutbound()
            ) {
              panTranslateX.value = withTiming(
                velocityX > 0
                  ? Math.max(
                      0,
                      panTranslateX.value -
                        (panTranslateX.value % totalViewWidth.value)
                    )
                  : Math.min(
                      getMaxTranslateX(),
                      panTranslateX.value -
                        (panTranslateX.value % totalViewWidth.value) +
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
        }),
    [
      activeNestedListIndex,
      getActiveListMaxTranslateY,
      getClosestTranslateXHinge,
      getClosestVerticalHingeBoundary,
      getCurrentTranslateY,
      getMaxTranslateX,
      getUnElasticTopHinge,
      getVerticalOutOfHingeLocation,
      handleHorizontalListOnUpdate,
      handleVerticalListOnUpdate,
      headerHeight,
      headerTranslateYEffective,
      isHorizontalListHinged,
      isHorizontalListOutbound,
      isVerticalListWithinHinge,
      outboundVerticalOffsetIsHeader,
      panTranslateX,
      panTranslateY,
      refreshing,
      refreshingActive,
      resetTranslationX,
      resetTranslationY,
      scrollingHorizontal,
      scrollingVertical,
      toggleHorizontalListToHinge,
      toggleVerticalListToHinge,
      totalViewWidth.value,
      triggerRefresh,
    ]
  );

  // panTranslate Reaction
  useAnimatedReaction(
    () => {
      return panTranslateY.value;
    },
    (newPanTranslateY) => {
      nestedTranslateYs.value = nestedTranslateYs.value.map(
        (nestedTranslateY, nestedListIndex) => {
          if (nestedListIndex === activeNestedListIndex.value)
            return newPanTranslateY;
          if (isHeaderRegion.value) {
            return calculateMaximumHeaderTranslationY(
              panTranslateYEffective.value
            );
          }
          return nestedTranslateY;
        }
      );
    },
    []
  );
  useAnimatedReaction(
    () => {
      return translateXEffective.value;
    },
    (horizontalOffset) => {
      if (UIThreadFunctionsRef.value.onHorizontalScroll) {
        if (useReanimatedUIThread) {
          UIThreadFunctionsRef.value.onHorizontalScroll(horizontalOffset);
        } else {
          runOnJS(UIThreadFunctionsRef.value.onHorizontalScroll)(
            horizontalOffset
          );
        }
      }
    },
    []
  );
  useAnimatedReaction(
    () => {
      return panTranslateYEffective.value;
    },
    (verticalOffset) => {
      if (UIThreadFunctionsRef.value.onVerticalScroll) {
        if (useReanimatedUIThread) {
          UIThreadFunctionsRef.value.onVerticalScroll(verticalOffset);
        } else {
          runOnJS(UIThreadFunctionsRef.value.onVerticalScroll)(verticalOffset);
        }
      }
    },
    []
  );
  useAnimatedReaction(
    () => {
      return [panTranslateYEffective.value];
    },
    (_, previous) => {
      if (previous !== null) {
        if (UIThreadData.value[activeNestedListIndex.value].length > 0) {
          if (currentEndOfListThresholdReached.value) {
            if (currentUnViewedOffset.value > onEndReachedDistance.value) {
              updateEndOfListThresholdReached();
            }
          } else if (
            currentUnViewedOffset.value <= onEndReachedDistance.value
          ) {
            updateEndOfListThresholdReached();
          }
        }
      }
    },
    []
  );
  useAnimatedReaction(
    () => {
      return currentEndOfListThresholdReached.value;
    },
    (endOfListThresholdReachedActivated) => {
      if (endOfListThresholdReachedActivated) {
        runOnJS(UIThreadFunctionsRef.value.onEndReached)(
          activeNestedListIndex.value
        );
      }
    },
    []
  );
  // effects
  // refreshingEffect
  useEffect(() => {
    if (!refreshing[activeNestedListIndex.value]) {
      runOnUI(cancelRefreshingAnimation)();
    }
  }, [refreshing, cancelRefreshingAnimation, activeNestedListIndex]);
  // triggeredOnRefreshEffect
  useEffect(() => {
    if (isNumber(triggeredOnRefresh)) {
      if (!refreshing[triggeredOnRefresh]) {
        runOnUI(cancelRefreshingAnimation)();
      }
      setTriggeredOnRefresh(null);
    }
  }, [triggeredOnRefresh, refreshing, cancelRefreshingAnimation]);
  // data effect
  useEffect(() => {
    UIThreadData.value = data;
    if (data.length !== nestedListsCount.current) {
      throw new Error("nested lists count must be constant through lifecycle");
    }
  }, [data, UIThreadData]);
  useEffect(() => {
    UIThreadFunctionsRef.value = {
      onRefresh,
      onVerticalScroll,
      onHorizontalScroll,
      onEndReached,
    };
  }, [
    onRefresh,
    onVerticalScroll,
    onHorizontalScroll,
    onEndReached,
    UIThreadFunctionsRef,
  ]);

  return {
    updateTotalViewLayout,
    gestureHandlers: [panGestureHandler, tapGestureHandler],
    refreshAnimationProgress,
    refreshingActive,
    listContainerAnimatedStyle,
    updateHeaderHeight,
    horizontalListAnimatedContainerStyle,
    updateStickyHeaderHeight,
    scrollToNestedListIndex,
    activeNestedListIndex,
    translateXEffective,
    useNestedVerticalListProp: {
      panTranslateYEffectiveWithoutHeader,
      isPanTranslateYOverBoundsAtMax,
      isHeaderRegion,
      getTranslateYEffectiveFromNestedEffective,
      getNestedEffectiveFromTranslateYEffective,
      updateNestedTranslateYs,
      getMaxTranslateY,
      updateNestedListsLength,
      getActiveNestedListIndex,
      totalViewWidth,
      updatePanTranslateY,
      calculateMaximumHeaderTranslationY,
      stickyHeaderHeight,
    },
  };
};

export default useNestedList;
