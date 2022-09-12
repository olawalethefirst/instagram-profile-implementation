import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import React from "react";
import PropTypes from "prop-types";

function NestedVerticalList({
  translateYs,
  index,
  updateListLength,
  children,
  totalViewWidth,
}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateYs.value[index + 1],
        },
      ],
      width: totalViewWidth.value,
    };
  }, []);

  // console.log('re-rendered NestedVerticalList')

  return (
    // view necessary after change in layout orientation if not child height is binded by parents
    <View collapsable={false}>
      <Animated.View
        style={[animatedStyle]}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => updateListLength(index, height)}
      >
        {children}
      </Animated.View>
    </View>
  );
}

NestedVerticalList.propTypes = {
  translateYs: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired,
  index: PropTypes.number.isRequired,
  updateListLength: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  totalViewWidth: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default React.memo(NestedVerticalList);
