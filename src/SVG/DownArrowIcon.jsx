import { Svg, Path } from "react-native-svg";

function DownArrowIcon({ size }) {
  return (
    <Svg
      viewBox="0 0 12 8"
      fill="none"
      style={{ width: size, aspectRatio: 8 / 12 }}
    >
      <Path d="M1 1L6 6L11 1" stroke="white" strokeWidth="1" />
    </Svg>
  );
}

export default DownArrowIcon;
