import { Svg, Rect } from "react-native-svg";
import PropTypes from "prop-types";

function HamburgerIcon({ size }) {
  return (
    <Svg
      viewBox="0 0 18 18"
      fill="none"
      style={{ height: size, aspectRatio: 1 }}
    >
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
}

HamburgerIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

export default HamburgerIcon;
