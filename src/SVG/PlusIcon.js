import { Svg, Path, Rect } from 'react-native-svg';

const PlusIcon = (props) => {
    return (
        <Svg viewBox="0 0 20 20" fill="none" {...props}>
            <Path
                d="M10 6V14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M6 10H14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Rect
                x="1"
                y="1"
                width="18"
                height="18"
                rx="5"
                stroke="white"
                strokeWidth="1.5"
            />
        </Svg>
    );
};

export default PlusIcon;
