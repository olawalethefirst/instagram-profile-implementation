import { View } from "react-native";
import Animated from "react-native-reanimated";
import { memo, cloneElement, isValidElement } from "react";
import PropTypes from "prop-types";
import useNestedVerticalList from "./hooks/useNestedVerticalList";
import ListItemContainer from "./ListItemContainer";

function NestedVerticalList({
  nestedListIndex,
  useNestedVerticalListProp,
  data,
  renderListItem,
  listItemKeyExtractor,
  NestedListHeaderComponent,
  NestedListFooterComponent,
  nestedListContentContainerStyle,
}) {
  const [nestedListAnimatedStyle, onNestedListLengthChange] =
    useNestedVerticalList({ ...useNestedVerticalListProp, nestedListIndex });

  return (
    // view necessary after change in layout orientation if not child height is binded by parents
    <View collapsable={false}>
      <View collapsable={false} onLayout={onNestedListLengthChange}>
        <Animated.View style={[nestedListAnimatedStyle]}>
          {NestedListHeaderComponent &&
            (isValidElement(NestedListHeaderComponent) ? (
              cloneElement(NestedListHeaderComponent, { nestedListIndex })
            ) : (
              <NestedListHeaderComponent nestedListIndex={nestedListIndex} />
            ))}
          <View style={[nestedListContentContainerStyle]}>
            {data.map((item, index) => (
              <ListItemContainer
                key={
                  listItemKeyExtractor
                    ? listItemKeyExtractor(item, index, nestedListIndex)
                    : `nestedListIndex-${nestedListIndex},listItemIndex-${index}`
                }
              >
                {renderListItem({ item, index, nestedListIndex })}
              </ListItemContainer>
            ))}
          </View>
          {NestedListFooterComponent &&
          isValidElement(NestedListFooterComponent) ? (
            cloneElement(NestedListFooterComponent, { nestedListIndex })
          ) : (
            <NestedListFooterComponent nestedListIndex={nestedListIndex} />
          )}
        </Animated.View>
      </View>
    </View>
  );
}

NestedVerticalList.defaultProps = {
  listItemKeyExtractor: null,
  NestedListHeaderComponent: null,
  NestedListFooterComponent: null,
};

NestedVerticalList.propTypes = {
  nestedListIndex: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderListItem: PropTypes.func.isRequired,
  listItemKeyExtractor: PropTypes.func,
  useNestedVerticalListProp: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.objectOf(PropTypes.number),
      PropTypes.objectOf(PropTypes.bool),
    ])
  ).isRequired,
  NestedListFooterComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
  ]),
  NestedListHeaderComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
  ]),
  // eslint-disable-next-line react/forbid-prop-types
  nestedListContentContainerStyle: PropTypes.object.isRequired,
};

export default memo(NestedVerticalList);
