import { Path, Svg } from 'react-native-svg';
import PropTypes from 'prop-types';
import { color5a5a5a, colorWhite, width } from '../constants';
import { Animated } from 'react-native';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const GridIcon = ({ size, scrollX }) => {
    const activeOpacity = scrollX.interpolate({
        inputRange: [width / 2 - 0.000000000001, width / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const inactiveOpacity = activeOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <AnimatedPath
                d="M19 1H1V19H19V1Z"
                stroke={colorWhite}
                opacity={activeOpacity}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <AnimatedPath
                d="M19 1H1V19H19V1Z"
                stroke={color5a5a5a}
                opacity={inactiveOpacity}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <AnimatedPath
                d="M7 19V1"
                stroke={colorWhite}
                opacity={activeOpacity}
                stroke-miterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <AnimatedPath
                d="M7 19V1"
                stroke={color5a5a5a}
                opacity={inactiveOpacity}
                stroke-miterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <AnimatedPath
                d="M13 19V1"
                stroke={colorWhite}
                opacity={activeOpacity}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <AnimatedPath
                d="M13 19V1"
                stroke={color5a5a5a}
                opacity={inactiveOpacity}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <AnimatedPath
                d="M19 13H1"
                stroke={colorWhite}
                opacity={activeOpacity}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <AnimatedPath
                d="M19 13H1"
                stroke={color5a5a5a}
                opacity={inactiveOpacity}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <AnimatedPath
                d="M19 7H1"
                stroke={colorWhite}
                opacity={activeOpacity}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <AnimatedPath
                d="M19 7H1"
                stroke={color5a5a5a}
                opacity={inactiveOpacity}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </Svg>
    );
};

GridIcon.propTypes = {
    size: PropTypes.number,
    scrollX: PropTypes.object,
};

export default GridIcon;
