import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Path } from "react-native-svg";
import { memo } from "react";
import PropTypes from "prop-types";

const AnimatedPath = Animated.createAnimatedComponent(Path);

function RefreshControlPaths({
  d,
  pathIndex,
  opacitySequence,
  getPathOpacity,
  refreshingState,
  rotatingOpacityCount,
  refreshAnimationProgress,
}) {
  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: getPathOpacity(
        refreshingState.value,
        opacitySequence,
        rotatingOpacityCount.value,
        pathIndex,
        refreshAnimationProgress.value
      ),
    }),
    []
  );

  return (
    <AnimatedPath
      stroke="white"
      strokeWidth="3"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={[animatedStyle]}
      d={d}
    />
  );
}

RefreshControlPaths.propTypes = {
  d: PropTypes.string.isRequired,
  pathIndex: PropTypes.number.isRequired,
  opacitySequence: PropTypes.arrayOf(PropTypes.number).isRequired,
  getPathOpacity: PropTypes.func.isRequired,
  refreshingState: PropTypes.objectOf(PropTypes.number).isRequired,
  rotatingOpacityCount: PropTypes.objectOf(PropTypes.number).isRequired,
  refreshAnimationProgress: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default memo(RefreshControlPaths);
