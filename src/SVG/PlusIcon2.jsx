import { Svg, Path } from "react-native-svg";
import propTypes from "prop-types";

function PlusIcon2({ size, stroke }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 8 8" fill="none">
      <Path
        d="M4 0V8"
        stroke="white"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M0 4H8"
        stroke="white"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

PlusIcon2.defaultProps = {
  stroke: 1.5,
};

PlusIcon2.propTypes = {
  size: propTypes.number.isRequired,
  stroke: propTypes.number,
};

export default PlusIcon2;
