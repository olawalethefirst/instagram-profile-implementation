import { Svg } from "react-native-svg";
import Animated, {
  useDerivedValue,
  useAnimatedProps,
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useCallback, memo } from "react";
import PropTypes from "prop-types";
import RefreshControlPaths from "./RefreshControlPaths";
import formatOpacitySequence from "../helperFunctions/formatOpacitySequence";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const refreshPercentile = 100 / 8;
const opacitySequenceTemplate = new Array(8)
  .fill()
  .map((_, i) => (100 - i * refreshPercentile) / 100);
const refreshPathsD = [
  "M12 7L12 2",
  "M16 8L19.5355 4.46447",
  "M22 12L17 12",
  "M16 16L19.5355 19.5355",
  "M12 22L12 17",
  "M8 16L4.46447 19.5355",
  "M7 12L2 12",
  "M4.5 4.5L8.03553 8.03553",
];

function RefreshControl({ size, refreshAnimationProgress, refreshingActive }) {
  // sharedValues
  const rotation = useSharedValue(0);
  const rotatingOpacityCount = useSharedValue(-1);
  const refreshingState = useSharedValue(0);

  // derivedValues && helperFunctions
  const opacity = useDerivedValue(() => {
    if (refreshingState.value === 0)
      return Math.floor(refreshAnimationProgress.value / 12.5) / 8;

    return 1;
  }, []);
  const scale = useDerivedValue(() => {
    if (refreshingState.value === 2)
      return refreshAnimationProgress.value / 100;

    return 1;
  }, []);
  const updateRefreshingState = useCallback(
    (newRefreshingState) => {
      "worklet";

      // refreshingState can exist between 0 and 2 to indicate ENTERING, REFRESHING, EXITING phases

      refreshingState.value = newRefreshingState;
    },
    [refreshingState]
  );
  const getPathRefreshEnteringOpacity = useCallback(
    (pathIndex, refreshAnimationProgressValue) => {
      "worklet";

      return (
        (refreshAnimationProgressValue >= refreshPercentile * (pathIndex + 1)) +
        0
      );
    },
    []
  );
  const getPathOpacity = useCallback(
    (
      refreshingStateValue,
      opacitySequence,
      rotatingOpacityCountValue,
      pathIndex,
      refreshAnimationProgressValue
    ) => {
      "worklet";

      return refreshingStateValue > 0
        ? opacitySequence[rotatingOpacityCountValue]
        : getPathRefreshEnteringOpacity(
            pathIndex,
            refreshAnimationProgressValue
          );
    },
    [getPathRefreshEnteringOpacity]
  );

  // Reactions
  // refreshActive reactions
  useAnimatedReaction(
    () => {
      return refreshingActive.value;
    },
    (currentRefreshingActive, previousRefreshingActive) => {
      if (previousRefreshingActive !== null) {
        if (currentRefreshingActive === true) {
          updateRefreshingState(1);
        } else if (currentRefreshingActive === false) {
          updateRefreshingState(2);
        }
      }
    },
    []
  );
  // refreshAnimationProgress, refreshingActive && refreshingState reactions
  useAnimatedReaction(
    () => {
      return [
        refreshAnimationProgress.value,
        refreshingActive.value,
        refreshingState.value,
      ];
    },
    ([
      currentRefreshProgress,
      currentRefreshingStatus,
      currentRefreshingState,
    ]) => {
      if (
        currentRefreshProgress === 0 &&
        !currentRefreshingStatus &&
        currentRefreshingState > 0
      ) {
        updateRefreshingState(0);
      }
    },
    []
  );
  // refreshingState reactions
  useAnimatedReaction(
    () => {
      return refreshingState.value;
    },
    (currentRefreshingState) => {
      if (currentRefreshingState === 1) {
        if (rotatingOpacityCount.value < 0) {
          rotatingOpacityCount.value = 0;
        }
        rotation.value = withTiming(360, { duration: 125 });
      } else if (currentRefreshingState === 0) {
        rotatingOpacityCount.value = -1;
        rotation.value = 0;
      }
    },
    []
  );
  // rotatingOpacityCount Reaction
  useAnimatedReaction(
    () => {
      return rotatingOpacityCount.value;
    },
    (presentRotatingOpacityCountValue, previousRotatingOpacityCountValue) => {
      if (
        presentRotatingOpacityCountValue >= 0 &&
        presentRotatingOpacityCountValue !== previousRotatingOpacityCountValue
      ) {
        rotatingOpacityCount.value = withDelay(
          125,
          withTiming(
            (presentRotatingOpacityCountValue + 1) %
              opacitySequenceTemplate.length,
            { duration: 0 }
          )
        );
      }
    },
    []
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    };
  }, []);

  return (
    <AnimatedSvg
      style={[]}
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      animatedProps={animatedProps}
    >
      {refreshPathsD.map((d, i) => (
        <RefreshControlPaths
          key={d}
          d={d}
          pathIndex={i}
          opacitySequence={formatOpacitySequence(opacitySequenceTemplate, i)}
          getPathOpacity={getPathOpacity}
          refreshingState={refreshingState}
          rotatingOpacityCount={rotatingOpacityCount}
          refreshAnimationProgress={refreshAnimationProgress}
        />
      ))}
    </AnimatedSvg>
  );
}

RefreshControl.propTypes = {
  size: PropTypes.number.isRequired,
  refreshAnimationProgress: PropTypes.objectOf(PropTypes.number).isRequired,
  refreshingActive: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default memo(RefreshControl);
