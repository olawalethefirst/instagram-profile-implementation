import { Svg, Path, Circle } from "react-native-svg";
import PropTypes from "prop-types";
import { memo } from "react";

function TaggedPostsIcon({ size, stroke }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle strokeWidth={1.5} cx="10" cy="8.75" r="2.75" stroke={stroke} />
      <Path
        d="M15.5 18.65C15 14.8786 12.3195 14.25 10.0016 14.25C7.68371 14.25 5.26953 14.8786 4.5 18.65"
        strokeWidth={1.5}
        stroke={stroke}
      />
      <Path
        d="M1 5.23784C1 4.13327 1.89543 3.23784 3 3.23784H8L10 1L12 3.23784H17C18.1046 3.23784 19 4.13327 19 5.23784V17C19 18.1046 18.1046 19 17 19H10H3C1.89543 19 1 18.1046 1 17V5.23784Z"
        strokeWidth={1.5}
        stroke={stroke}
      />
    </Svg>
  );
}

TaggedPostsIcon.propTypes = {
  size: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired,
};

export default memo(TaggedPostsIcon);
