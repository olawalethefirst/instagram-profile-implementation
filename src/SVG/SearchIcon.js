import { Svg, Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const SearchIcon = ({ width, height, focused }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 19 19" fill="none">
            {focused && (
                <>
                    <Path
                        d="M15.4571 8.22512C15.4571 12.215 12.2212 15.4502 8.22857 15.4502C4.23595 15.4502 1 12.215 1 8.22512C1 4.23519 4.23595 1 8.22857 1C12.2212 1 15.4571 4.23519 15.4571 8.22512Z"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        d="M17.9997 17.999L13.3711 13.6445"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </>
            )}
            {!focused && (
                <>
                    <Path
                        d="M15.7071 8.22512C15.7071 12.3532 12.3592 15.7002 8.22857 15.7002C4.09797 15.7002 0.75 12.3532 0.75 8.22512C0.75 4.09702 4.09797 0.75 8.22857 0.75C12.3592 0.75 15.7071 4.09702 15.7071 8.22512Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        d="M17.9997 17.999L13.3711 13.6445"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </>
            )}
        </Svg>
    );
};

SearchIcon.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    focused: PropTypes.bool,
};

export default SearchIcon;
