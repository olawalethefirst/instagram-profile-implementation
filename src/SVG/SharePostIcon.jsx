import { Svg, Path } from "react-native-svg";
import PropTypes from "prop-types";

function SharePostIcon({ size }) {
  return (
    <Svg
      viewBox="0 0 26 24"
      fill="none"
      style={{ height: size, aspectRatio: 26 / 24 }}
    >
      <Path
        d="M24.0187 3.14321L3.04888 1.98619L10.9728 9.66576M24.0187 3.14321L12.4558 20.718L10.9728 9.66576M24.0187 3.14321L10.9728 9.66576"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
}

SharePostIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

export default SharePostIcon;
