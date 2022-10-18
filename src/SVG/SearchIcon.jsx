import { Svg, Path } from "react-native-svg";
import PropTypes from "prop-types";

function SearchIcon({ size, focused }) {
  return (
    <Svg
      viewBox="0 0 19 19"
      fill="none"
      style={{ height: size, aspectRatio: 1 }}
    >
      <Path
        d="M15.4571 8.22512C15.4571 12.215 12.2212 15.4502 8.22857 15.4502C4.23595 15.4502 1 12.215 1 8.22512C1 4.23519 4.23595 1 8.22857 1C12.2212 1 15.4571 4.23519 15.4571 8.22512Z"
        stroke="white"
        strokeWidth={focused ? "2.5" : "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.9997 17.999L13.3711 13.6445"
        stroke="white"
        strokeWidth={focused ? "2.5" : "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

SearchIcon.propTypes = {
  size: PropTypes.number.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default SearchIcon;
