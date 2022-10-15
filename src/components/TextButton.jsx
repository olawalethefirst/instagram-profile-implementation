import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { activeOpacity } from "../constants";

function TextButton({ children, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
}

TextButton.defaultProps = {
  style: {},
  onPress: null,
};

TextButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])),
  ]).isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default TextButton;
