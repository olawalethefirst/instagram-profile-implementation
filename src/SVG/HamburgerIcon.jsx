import { Svg, Rect } from 'react-native-svg';

const HamburgerIcon = (props) => {
    return (
        <Svg viewBox="0 0 18 18" fill="none" {...props}>
            <Rect
                x="1.89453"
                y="2"
                width="14.2105"
                height="1.5"
                rx="0.75"
                fill="white"
            />
            <Rect
                x="1.89453"
                y="8"
                width="14.2105"
                height="1.5"
                rx="0.75"
                fill="white"
            />
            <Rect
                x="1.89453"
                y="14"
                width="14.2105"
                height="1.5"
                rx="0.75"
                fill="white"
            />
        </Svg>
    );
};

export default HamburgerIcon;
