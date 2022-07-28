import { Svg, Path } from 'react-native-svg';

const DownArrowIcon = (props) => {
    return (
        <Svg viewBox="0 0 12 8" fill="none" {...props}>
            <Path d="M1 1L6 6L11 1" stroke="white" strokeWidth="1" />
        </Svg>
    );
};

export default DownArrowIcon;
