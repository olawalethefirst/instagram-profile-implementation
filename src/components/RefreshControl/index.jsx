import { StyleSheet } from 'react-native';
import { Svg } from 'react-native-svg';
import Animated, {
    useDerivedValue,
    useAnimatedStyle,
    useAnimatedProps,
    useSharedValue,
    useAnimatedReaction,
    withTiming,
    withRepeat,
    withDelay,
    withSequence,
} from 'react-native-reanimated';
import RefreshControlPaths from './RefreshControlPaths';
import React from 'react';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const progressPercentile = 100 / 8;
const opacitySequence = new Array(8)
    .fill()
    .map((_, i) => (100 - i * progressPercentile) / 100);
console.log(('opacitySequence', opacitySequence));

export default React.memo(function RefreshControl({
    style,
    refreshAnimationProgress,
    refreshingActive,
    refreshing,
}) {
    let progressIndex = -1;

    const opacity = useSharedValue(0);
    const fullyRevealed = useSharedValue(false);
    const rotation = useSharedValue(0);
    const refreshingCount = useSharedValue(0);
    useAnimatedReaction(
        () => {
            if (!fullyRevealed.value)
                return (
                    (Math.floor(refreshAnimationProgress.value / 12.5) * 1) / 8
                );
            return 1;
        },
        (result) => {
            opacity.value = result;
            if (refreshAnimationProgress.value === 0) {
                fullyRevealed.value = false;
                rotation.value = 0;
                refreshingCount.value = 0;
                return;
            }
            if (result === 1 && !fullyRevealed.value) {
                rotation.value = withTiming(360, { duration: 100 });

                fullyRevealed.value = true;
            }
        },
        []
    );
    useAnimatedReaction(
        () => {
            if (fullyRevealed.value || refreshingCount.value) {
                return refreshingCount.value + 1;
            }
        },
        (result, previous) => {
            if (result && result !== previous) {
                refreshingCount.value = withDelay(
                    125,
                    withTiming(result, { duration: 0 })
                );
            }
        },
        []
    );
    const scale = useDerivedValue(() => {
        if (fullyRevealed.value && !refreshing) {
            return refreshAnimationProgress.value / 100;
        }
        return 1;
    }, [refreshing]);

    const animatedStyle = useAnimatedProps(() => {
        // console.log('inside refreshControl', refreshingSequence.value);
        return {
            opacity: opacity.value,
            transform: [
                { scale: scale.value },
                { rotate: `${rotation.value}deg` },
            ],
        };
    }, []);

    return (
        <AnimatedSvg
            style={[style]}
            viewBox="0 0 24 24"
            fill="none"
            animatedProps={animatedStyle}
        >
            <RefreshControlPaths
                refreshAnimationProgress={refreshAnimationProgress}
                progressIndex={(progressIndex += 1)}
                progressPercentile={progressPercentile}
                fullyRevealed={fullyRevealed}
                refreshingActive={refreshingActive}
                refreshingCount={refreshingCount}
                opacitySequence={opacitySequence}
                d="M12 7L12 2"
                stroke="white"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <RefreshControlPaths
                refreshAnimationProgress={refreshAnimationProgress}
                progressIndex={(progressIndex += 1)}
                progressPercentile={progressPercentile}
                fullyRevealed={fullyRevealed}
                refreshingActive={refreshingActive}
                refreshingCount={refreshingCount}
                opacitySequence={opacitySequence}
                d="M16 8L19.5355 4.46447"
                stroke="white"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <RefreshControlPaths
                refreshAnimationProgress={refreshAnimationProgress}
                progressIndex={(progressIndex += 1)}
                progressPercentile={progressPercentile}
                fullyRevealed={fullyRevealed}
                refreshingActive={refreshingActive}
                refreshingCount={refreshingCount}
                opacitySequence={opacitySequence}
                d="M22 12L17 12"
                stroke="white"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <RefreshControlPaths
                refreshAnimationProgress={refreshAnimationProgress}
                progressIndex={(progressIndex += 1)}
                progressPercentile={progressPercentile}
                fullyRevealed={fullyRevealed}
                refreshingActive={refreshingActive}
                refreshingCount={refreshingCount}
                opacitySequence={opacitySequence}
                d="M16 16L19.5355 19.5355"
                stroke="white"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <RefreshControlPaths
                refreshAnimationProgress={refreshAnimationProgress}
                progressIndex={(progressIndex += 1)}
                progressPercentile={progressPercentile}
                fullyRevealed={fullyRevealed}
                refreshingActive={refreshingActive}
                refreshingCount={refreshingCount}
                opacitySequence={opacitySequence}
                d="M12 22L12 17"
                stroke="white"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <RefreshControlPaths
                refreshAnimationProgress={refreshAnimationProgress}
                progressIndex={(progressIndex += 1)}
                progressPercentile={progressPercentile}
                fullyRevealed={fullyRevealed}
                refreshingActive={refreshingActive}
                refreshingCount={refreshingCount}
                opacitySequence={opacitySequence}
                d="M8 16L4.46447 19.5355"
                stroke="white"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <RefreshControlPaths
                refreshAnimationProgress={refreshAnimationProgress}
                progressIndex={(progressIndex += 1)}
                progressPercentile={progressPercentile}
                fullyRevealed={fullyRevealed}
                refreshingActive={refreshingActive}
                refreshingCount={refreshingCount}
                opacitySequence={opacitySequence}
                d="M7 12L2 12"
                stroke="white"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <RefreshControlPaths
                refreshAnimationProgress={refreshAnimationProgress}
                progressIndex={(progressIndex += 1)}
                progressPercentile={progressPercentile}
                fullyRevealed={fullyRevealed}
                refreshingActive={refreshingActive}
                refreshingCount={refreshingCount}
                opacitySequence={opacitySequence}
                d="M4.5 4.5L8.03553 8.03553"
                stroke="white"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </AnimatedSvg>
    );
});

const styles = StyleSheet.create({});
