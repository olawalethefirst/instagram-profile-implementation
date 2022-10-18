import { Svg, Path } from "react-native-svg";
import PropTypes from "prop-types";

function PostCommentIcon({ size }) {
  return (
    <Svg
      viewBox="0 0 21 20"
      fill="none"
      style={{ height: size, aspectRatio: 21 / 20 }}
    >
      <Path
        d="M14.2038 16.0137C12.5477 17.0984 10.5589 17.553 8.60512 17.2934C6.65137 17.0339 4.86485 16.0776 3.57593 14.6016C2.287 13.1255 1.58285 11.2295 1.59369 9.26405C1.60453 7.29865 2.32962 5.39683 3.63489 3.91027C4.94015 2.42371 6.7373 1.45297 8.694 1.17755C10.6507 0.902131 12.6346 1.34067 14.2788 2.41207C15.9231 3.48347 17.1164 5.11526 17.6382 7.00569C18.16 8.89612 17.975 10.9173 17.1173 12.6955L18.5616 17.6825L14.2038 16.0137Z"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
}

PostCommentIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

export default PostCommentIcon;
