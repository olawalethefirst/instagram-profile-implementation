import { Svg, Path } from "react-native-svg";
import React from "react";
import PropTypes from "prop-types";

function ViewPostHeaderBackIcon({ size }) {
  return (
    <Svg
      viewBox="0 0 14 22"
      fill="none"
      style={{ width: size, aspectRatio: 14 / 22 }}
    >
      <Path
        d="M12 2L7.5 6.5L3 11L12 20"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </Svg>
  );
}
ViewPostHeaderBackIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ViewPostHeaderBackIcon;

<svg
  width="14"
  height="22"
  viewBox="0 0 14 22"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 2L7.5 6.5L3 11L12 20"
    stroke="black"
    strokeWidth="4"
    strokeLinecap="round"
  />
</svg>;
