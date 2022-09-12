import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
    withRepeat,
    AnimatableValue,
    useSharedValue,
    useAnimatedReaction,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import formatOpacitySequence from '../../helperFunctions/formatOpacitySequence';

const AnimatedPath = Animated.createAnimatedComponent(Path);

function RefreshControlPaths({
    refreshAnimationProgress,
    progressIndex,
    progressPercentile,
    fullyRevealed,
    opacitySequence,
    refreshingCount,
    ...props
}) {
    const sequence = useMemo(
        () => formatOpacitySequence(opacitySequence, progressIndex),
        [opacitySequence]
    );
    const opacity = useDerivedValue(() => {
        if (!fullyRevealed.value)
            return (
                (refreshAnimationProgress.value >=
                    progressPercentile * (progressIndex + 1)) +
                0
            );
        return sequence[refreshingCount.value % 8];
    }, []);

    const animatedStyle = useAnimatedStyle(
        () => ({
            opacity: opacity.value,
        }),
        []
    );

    return <AnimatedPath {...props} style={[animatedStyle]} />;
}

RefreshControlPaths.propTypes = {
    // refreshAnimationProgress: PropTypes.,
    // progressIndex,
    // progressPercentile,
    // refreshingActive,
    // refreshing,
};

export default React.memo(RefreshControlPaths);
