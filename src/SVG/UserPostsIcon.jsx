import { Path, Svg } from "react-native-svg";
import PropTypes from "prop-types";
import { memo } from "react";

function UserPostsIcon({ size, stroke }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M19 1H1V19H19V1Z"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        d="M7 19V1"
        stroke={stroke}
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        d="M13 19V1"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        d="M19 13H1"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        d="M19 7H1"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

UserPostsIcon.propTypes = {
  size: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired,
};

export default memo(UserPostsIcon);
