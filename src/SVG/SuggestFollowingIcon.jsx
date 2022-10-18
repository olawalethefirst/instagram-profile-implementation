import { Svg, Path } from "react-native-svg";
import PropTypes from "prop-types";

function SuggestFollowingIcon({ width }) {
  return (
    <Svg
      viewBox="0 0 24 20"
      fill="none"
      style={{ width, aspectRatio: 24 / 20 }}
    >
      <Path
        d="M8 19V17C8 15.9391 8.42143 14.9217 9.17157 14.1716C9.92172 13.4214 10.9391 13 12 13H19C20.0609 13 21.0783 13.4214 21.8284 14.1716C22.5786 14.9217 23 15.9391 23 17V19"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.5 9C13.2909 9 11.5 7.20914 11.5 5C11.5 2.79086 13.2909 1 15.5 1C17.7091 1 19.5 2.79086 19.5 5C19.5 7.20914 17.7091 9 15.5 9Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 6V12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 9H7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

SuggestFollowingIcon.propTypes = {
  width: PropTypes.number.isRequired,
};

export default SuggestFollowingIcon;
