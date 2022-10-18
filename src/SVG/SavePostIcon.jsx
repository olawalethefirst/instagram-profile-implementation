import { Svg, Path } from "react-native-svg";
import PropTypes from "prop-types";

function SavePostIcon({ size, saved }) {
  return (
    <Svg
      viewBox="0 0 22 26"
      fill="none"
      style={{ height: size, aspectRatio: 22 / 26 }}
    >
      <Path
        d="M1 1H21V23L11 13.76L1 23V1Z"
        stroke="white"
        strokeWidth="2"
        {...{ fill: saved ? "white" : "none" }}
      />
    </Svg>
  );
}

SavePostIcon.propTypes = {
  size: PropTypes.number.isRequired,
  saved: PropTypes.bool.isRequired,
};

export default SavePostIcon;
