import { Svg, Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const ReelsIcon = ({ width, height, focused }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
            {focused && (
                <>
                    <Path
                        d="M0.75 5.60156H17.25V13.7516C17.25 15.6846 15.683 17.2516 13.75 17.2516H4.25C2.317 17.2516 0.75 15.6846 0.75 13.7516V5.60156Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="1.5"
                    />
                    <Path
                        d="M4.25 0.75H13.75C15.683 0.75 17.25 2.317 17.25 4.25V5.60294H0.75V4.25C0.75 2.317 2.317 0.75 4.25 0.75Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="1.5"
                    />
                    <Path
                        d="M4.25 0.75H4.94982L6.4776 5.60294H0.75V4.25C0.75 2.317 2.317 0.75 4.25 0.75ZM13.0502 5.60294L11.5224 0.75H13.75C15.683 0.75 17.25 2.317 17.25 4.25V5.60294H13.0502Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="1.5"
                    />
                    <Path
                        d="M7.5 6H0M7.5 6.00138L12.5 6H18"
                        stroke="black"
                        strokeWidth="1.5"
                    />
                    <Path
                        d="M4 0H5.5L8 6.35H6.4252L5.77617 4.7625L5.12714 3.175L4.5 1.5L4 0Z"
                        fill="black"
                    />
                    <Path
                        d="M10 0H11.5846L12.2128 1.5875L12.8409 3.175L13.1691 3.96875L13.4973 4.7625L14.1537 6.35H12.5L10 0Z"
                        fill="black"
                    />
                    <Path
                        d="M11.6422 11.2977C11.7896 11.3714 11.7896 11.5817 11.6422 11.6554L8.03944 13.4568C7.90646 13.5233 7.75 13.4266 7.75 13.278L7.75 9.67517C7.75 9.52649 7.90646 9.42979 8.03944 9.49628L11.6422 11.2977Z"
                        fill="black"
                        stroke="black"
                    />
                </>
            )}
            {!focused && (
                <>
                    <Path
                        d="M4.25 0.75H4.98916L6.89888 5.60294H0.75V4.25C0.75 2.317 2.317 0.75 4.25 0.75ZM13.0108 5.60294L11.1011 0.75H13.75C15.683 0.75 17.25 2.317 17.25 4.25V5.60294H13.0108Z"
                        stroke="white"
                        strokeWidth="1.5"
                    />
                    <Path
                        d="M11.6422 11.2977C11.7896 11.3714 11.7896 11.5817 11.6422 11.6554L8.03944 13.4568C7.90646 13.5233 7.75 13.4266 7.75 13.278L7.75 9.67517C7.75 9.52649 7.90646 9.42979 8.03944 9.49628L11.6422 11.2977Z"
                        fill="white"
                        stroke="white"
                    />
                    <Path
                        d="M0.75 5.60156H17.25V13.7516C17.25 15.6846 15.683 17.2516 13.75 17.2516H4.25C2.317 17.2516 0.75 15.6846 0.75 13.7516V5.60156Z"
                        stroke="white"
                        strokeWidth="1.5"
                    />
                    <Path
                        d="M4.25 0.75H13.75C15.683 0.75 17.25 2.317 17.25 4.25V5.60294H0.75V4.25C0.75 2.317 2.317 0.75 4.25 0.75Z"
                        stroke="white"
                        strokeWidth="1.5"
                    />

                </>
            )}
        </Svg>
    );
};

ReelsIcon.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    focused: PropTypes.bool,
};

export default ReelsIcon;
