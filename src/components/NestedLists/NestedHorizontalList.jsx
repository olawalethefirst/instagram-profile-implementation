import { useCallback, memo } from "react";
import PropTypes from "prop-types";
import NestedVerticalList from "./NestedVerticalList";

function NestedHorizontalList({
  data,
  renderListItem,
  useNestedVerticalListProp,
  listItemKeyExtractor,
  nestedListKeyExtractor,
  NestedListHeaderComponent,
  NestedListFooterComponent,
  nestedListContentContainerStyle,
}) {
  const renderNestedVerticalLists = useCallback(
    (nestedListData, index) => (
      <NestedVerticalList
        key={
          nestedListKeyExtractor
            ? nestedListKeyExtractor(nestedListData, index)
            : index
        }
        nestedListIndex={index}
        data={nestedListData}
        renderListItem={renderListItem}
        listItemKeyExtractor={listItemKeyExtractor}
        useNestedVerticalListProp={useNestedVerticalListProp}
        NestedListHeaderComponent={NestedListHeaderComponent}
        NestedListFooterComponent={NestedListFooterComponent}
        nestedListContentContainerStyle={nestedListContentContainerStyle}
      />
    ),
    [
      renderListItem,
      useNestedVerticalListProp,
      listItemKeyExtractor,
      nestedListKeyExtractor,
      NestedListHeaderComponent,
      NestedListFooterComponent,
      nestedListContentContainerStyle,
    ]
  );

  return <>{data.map(renderNestedVerticalLists)}</>;
}

NestedHorizontalList.defaultProps = {
  listItemKeyExtractor: null,
  nestedListKeyExtractor: null,
  NestedListFooterComponent: null,
  NestedListHeaderComponent: null,
};

NestedHorizontalList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  renderListItem: PropTypes.func.isRequired,
  useNestedVerticalListProp: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.objectOf(PropTypes.number),
      PropTypes.objectOf(PropTypes.bool),
    ])
  ).isRequired,
  listItemKeyExtractor: PropTypes.func,
  nestedListKeyExtractor: PropTypes.func,
  NestedListHeaderComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
  ]),
  NestedListFooterComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
  ]),
  // eslint-disable-next-line react/forbid-prop-types
  nestedListContentContainerStyle: PropTypes.object.isRequired,
};

export default memo(NestedHorizontalList);
