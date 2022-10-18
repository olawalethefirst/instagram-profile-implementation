import { Svg, Path, Circle } from "react-native-svg";
import PropTypes from "prop-types";

function ProfileIcon({ size, focused }) {
  return (
    <Svg
      viewBox="0 0 18 18"
      fill="none"
      style={{ height: size, aspectRatio: 1 }}
    >
      {focused && (
        <>
          <Circle cx="9" cy="9" r="9" fill="white" />
          <Circle cx="9" cy="6" r="2.5" fill="black" />
          <Path
            d="M14 12.1429C14 13.7208 10.875 15 9 15C7.125 15 4 13.7208 4 12.1429C4 10.5649 6.63307 10 9 10C11.3669 10 14 10.5649 14 12.1429Z"
            fill="black"
          />
        </>
      )}
      {!focused && (
        <>
          <Circle cx="9" cy="9" r="8.5" stroke="white" />
          <Circle cx="9" cy="7" r="3" stroke="white" />
          <Path
            d="M14 16C13.5455 12.5714 11.1086 12 9.00146 12C6.89428 12 4.69957 12.5714 4 16"
            stroke="white"
          />
        </>
      )}
    </Svg>
  );
}

ProfileIcon.propTypes = {
  size: PropTypes.number.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default ProfileIcon;
