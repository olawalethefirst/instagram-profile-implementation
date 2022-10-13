import { TouchableOpacity } from "react-native-gesture-handler";
import { memo } from "react";
import { useDerivedValue } from "react-native-reanimated";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";

function StickyHeaderIconContainer({
  activeNestedListIndex,
  nestedListIndex,
  scrollToNestedListIndex,
  StickyHeaderIcon,
}) {
  const focussed = useDerivedValue(
    () => activeNestedListIndex.value === nestedListIndex
  );

  return (
    <View style={styles.stickyHeaderButtonContainer}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => scrollToNestedListIndex(nestedListIndex)}
        style={styles.stickyHeaderButton}
      >
        <StickyHeaderIcon
          nestedListIndex={nestedListIndex}
          size={25}
          focussed={focussed}
        />
      </TouchableOpacity>
    </View>
  );
}

StickyHeaderIconContainer.propTypes = {
  activeNestedListIndex: PropTypes.objectOf(PropTypes.number).isRequired,
  nestedListIndex: PropTypes.number.isRequired,
  scrollToNestedListIndex: PropTypes.func.isRequired,
  StickyHeaderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
};

export default memo(StickyHeaderIconContainer);
