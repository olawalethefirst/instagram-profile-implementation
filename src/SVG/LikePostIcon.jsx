import { Svg, Path } from "react-native-svg";
import PropTypes from "prop-types";

function LikePostIcon({ liked, size }) {
  return (
    <Svg
      viewBox="0 0 22 20"
      fill="none"
      style={{ height: size, aspectRatio: 22 / 20 }}
    >
      <Path
        d="M2.21688 10.0464C0.0535382 7.16198 0.774652 2.8353 4.38022 1.39307C7.98579 -0.0491592 10.1491 2.8353 10.8702 4.27752C11.5914 2.8353 14.4758 -0.0491592 18.0814 1.39307C21.687 2.8353 21.687 7.16198 19.5236 10.0464C17.3603 12.9309 10.8702 18.6998 10.8702 18.6998C10.8702 18.6998 4.38022 12.9309 2.21688 10.0464Z"
        stroke={liked ? "#FF0000" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...{ fill: liked ? "#FF0000" : "none" }}
      />
    </Svg>
  );
}

LikePostIcon.propTypes = {
  liked: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
};

export default LikePostIcon;
