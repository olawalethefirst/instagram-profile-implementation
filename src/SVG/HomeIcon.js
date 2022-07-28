import { Svg, Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const HomeIcon = ({ width, height, focused }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
            {focused && (
                <Path
                    d="M8.99999 1.04405L17.2498 9.03352L17.25 17.25H13.3636H11.01V14.4974C11.01 13.9967 10.9516 13.4977 10.8359 13.0105C10.3764 11.076 7.6236 11.076 7.16414 13.0105C7.04844 13.4977 6.99 13.9967 6.99 14.4974V17.25H5.15455H0.75V9.03352L8.99999 1.04405Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.5"
                />
            )}
            {!focused && (
                <Path
                    d="M8.99999 1.04405L17.2498 9.03352L17.25 17.25H13.3636H11.01V14.4974C11.01 13.9967 10.9516 13.4977 10.8359 13.0105C10.3764 11.076 7.6236 11.076 7.16414 13.0105C7.04844 13.4977 6.99 13.9967 6.99 14.4974V17.25H5.15455H0.75V9.03352L8.99999 1.04405Z"
                    stroke="white"
                    strokeWidth="1.5"
                />
            )}
        </Svg>
    );
};

HomeIcon.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    focused: PropTypes.bool,
};

export default HomeIcon;
