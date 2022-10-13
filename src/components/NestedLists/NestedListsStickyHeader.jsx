import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { memo } from "react";
import PropTypes from "prop-types";
import StickyHeaderIconContainer from "./StickyHeaderIconContainer";
import styles from "./styles";

function NestedListsStickyHeader({
  nestedListsCount,
  StickyHeaderIcon,
  scrollToNestedListIndex,
  activeNestedListIndex,
  translateXEffective,
  stickyHeaderScrollIndicatorColor,
}) {
  const animatedHorizontalScrollIndicator = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXEffective.value / nestedListsCount }],
    };
  });

  return (
    <View>
      <View style={[styles.stickyHeaderButtonsContainer]}>
        {new Array(nestedListsCount).fill().map((_, index) => (
          <StickyHeaderIconContainer
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            activeNestedListIndex={activeNestedListIndex}
            nestedListIndex={index}
            scrollToNestedListIndex={scrollToNestedListIndex}
            StickyHeaderIcon={StickyHeaderIcon}
          />
        ))}
      </View>
      <Animated.View
        style={[
          animatedHorizontalScrollIndicator,
          styles.horizontalScrollIndicator,
          {
            backgroundColor: stickyHeaderScrollIndicatorColor,
            width: `${100 / nestedListsCount}%`,
          },
        ]}
      />
    </View>
  );
}

NestedListsStickyHeader.propTypes = {
  nestedListsCount: PropTypes.number.isRequired,
  StickyHeaderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  scrollToNestedListIndex: PropTypes.func.isRequired,
  activeNestedListIndex: PropTypes.objectOf(PropTypes.number).isRequired,
  translateXEffective: PropTypes.objectOf(PropTypes.number).isRequired,
  stickyHeaderScrollIndicatorColor: PropTypes.string.isRequired,
};

export default memo(NestedListsStickyHeader);
