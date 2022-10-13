import { View } from "react-native";
import PropTypes from "prop-types";
import { memo } from "react";

function ListItemContainer({ children }) {
  return <View collapsable={false}>{children}</View>;
}

ListItemContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default memo(ListItemContainer);
