import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { activeOpacity } from "../constants";

function ViewProfilePostFooterButton({ containerStyle, children, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={containerStyle}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

ViewProfilePostFooterButton.defaultProps = {
  containerStyle: {},
  onPress: null,
};

ViewProfilePostFooterButton.propTypes = {
  containerStyle: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onPress: PropTypes.func,
};

export default ViewProfilePostFooterButton;
