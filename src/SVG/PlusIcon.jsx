import { Svg, Path, Rect } from "react-native-svg";
import PropTypes from "prop-types";

function PlusIcon({ size }) {
  return (
    <Svg
      viewBox="0 0 20 20"
      fill="none"
      style={{ height: size, aspectRatio: 1 }}
    >
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
}

PlusIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

export default PlusIcon;
