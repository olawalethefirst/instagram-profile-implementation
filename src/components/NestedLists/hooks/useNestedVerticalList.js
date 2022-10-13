import {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
} from "react-native-reanimated";
import { useCallback } from "react";
import { runOnUI } from "react-native-reanimated/lib/reanimated2/core";

export default function useNestedVerticalList({
  nestedListIndex,

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
}) {
  // sharedValues
  const nestedTranslateYEffective = useSharedValue(0);

  //  derivedValues & helperFunctions
  const onNestedListLengthChange = useCallback(
    ({
      nativeEvent: {
        layout: { height },
      },
    }) => {
      runOnUI(() => {
        "worklet";

        updateNestedListsLength(nestedListIndex, height);
        const newMaxTranslateY = getMaxTranslateY(nestedListIndex);
        if (nestedListIndex === getActiveNestedListIndex()) {
          if (isPanTranslateYOverBoundsAtMax()) {
            // updated in order of immediate visual implication to user
            updatePanTranslateY(newMaxTranslateY);
          }
        } else if (
          !isHeaderRegion.value &&
          getTranslateYEffectiveFromNestedEffective(
            nestedTranslateYEffective.value
          ) > newMaxTranslateY
        ) {
          nestedTranslateYEffective.value =
            getNestedEffectiveFromTranslateYEffective(newMaxTranslateY);
          updateNestedTranslateYs(nestedListIndex, newMaxTranslateY);
        }
      })();
    },
    [
      updateNestedListsLength,
      nestedListIndex,
      getMaxTranslateY,
      getActiveNestedListIndex,
      isPanTranslateYOverBoundsAtMax,
      updatePanTranslateY,
      isHeaderRegion,
      getTranslateYEffectiveFromNestedEffective,
      nestedTranslateYEffective,
      getNestedEffectiveFromTranslateYEffective,
      updateNestedTranslateYs,
    ]
  );

  useAnimatedReaction(
    () => {
      return [
        isHeaderRegion.value,
        getActiveNestedListIndex() === nestedListIndex,
        panTranslateYEffectiveWithoutHeader.value,
      ];
    },
    ([
      isInHeaderRegion,
      listActive,
      newPanTranslateYEffectiveWithoutHeader,
    ]) => {
      if (listActive) {
        nestedTranslateYEffective.value =
          newPanTranslateYEffectiveWithoutHeader;
      } else if (isInHeaderRegion) {
        nestedTranslateYEffective.value = calculateMaximumHeaderTranslationY(
          newPanTranslateYEffectiveWithoutHeader
        );
      }
    },
    []
  );

  const nestedListAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -nestedTranslateYEffective.value,
        },
      ],
      width: totalViewWidth.value,
    };
  }, []);

  return [nestedListAnimatedStyle, onNestedListLengthChange];
}
