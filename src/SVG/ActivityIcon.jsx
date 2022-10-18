import { Svg, Path } from "react-native-svg";
import PropTypes from "prop-types";

function ActivityIcon({ size, focused }) {
  return (
    <Svg
      viewBox="0 0 18 16"
      fill="none"
      style={{ height: size, aspectRatio: 18 / 16 }}
    >
      <Path
        d="M8.2124 3.28518C8.33944 3.53927 8.59914 3.69977 8.88322 3.69977C9.1673 3.69977 9.427 3.53927 9.55404 3.28518C9.81134 2.77058 10.5177 1.90608 11.5268 1.32945C12.5088 0.768329 13.7283 0.503575 15.0947 1.05012C16.4352 1.5863 17.089 2.63052 17.2238 3.84385C17.3624 5.09104 16.9452 6.52647 16.0712 7.69179C15.1412 8.93188 13.24 10.8375 11.5299 12.4662C10.683 13.2728 9.89609 13.9991 9.32083 14.5239C9.15641 14.6739 9.00936 14.8074 8.88322 14.9215C8.75708 14.8074 8.61003 14.6739 8.44561 14.5239C7.87035 13.9991 7.08348 13.2728 6.23657 12.4662C4.52641 10.8375 2.62526 8.93188 1.69519 7.69179C-0.0107901 5.41715 0.615688 2.13214 3.32074 1.05012C4.69275 0.501317 5.73243 0.777126 6.52019 1.3023C7.34718 1.85363 7.9218 2.70398 8.2124 3.28518Z"
        fill={focused ? "white" : "none"}
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

ActivityIcon.propTypes = {
  size: PropTypes.number.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default ActivityIcon;
