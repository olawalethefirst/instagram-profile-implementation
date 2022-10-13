import { Svg, Path } from "react-native-svg";
import PropTypes from "prop-types";

export default function AlertIcon({ size, containerStyles }) {
  return (
    <Svg
      viewBox="0 0 22 22"
      strokeWidth="1.5"
      style={{ width: size, aspectRatio: 1, ...containerStyles }}
    >
      <Path
        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.375 5.5H11H10.625C10 5.5 9.5 6.05696 9.5 6.75316L10.125 12.7405C10.125 13.3392 10.5 13.8266 11 13.9658C11.5 13.8405 11.875 13.3392 11.875 12.7405L12.5 6.75316C12.5 6.05696 12 5.5 11.375 5.5Z"
        fill="white"
      />
      <Path
        d="M11 16.5013C11.5523 16.5013 12 16.0026 12 15.3874C12 14.7722 11.5523 14.2734 11 14.2734C10.4477 14.2734 10 14.7722 10 15.3874C10 16.0026 10.4477 16.5013 11 16.5013Z"
        fill="white"
      />
    </Svg>
  );
}

AlertIcon.defaultProps = {
  containerStyles: {},
};

AlertIcon.propTypes = {
  size: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  containerStyles: PropTypes.objectOf(PropTypes.any),
};
