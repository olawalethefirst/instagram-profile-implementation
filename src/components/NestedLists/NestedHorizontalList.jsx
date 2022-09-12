import { useCallback, memo } from "react";
import PropTypes from "prop-types";
import NestedVerticalList from "./NestedVerticalList";

function NestedHorizontalList({
  data,
  updateNestedListsLength,
  topCompHeight,
  translateYs,
  renderNestedListItem,
  totalViewWidth,
}) {
  const renderNestedVerticalLists = useCallback(
    (list, parentIndex) => (
      <NestedVerticalList
        translateYs={translateYs}
        index={parentIndex}
        key={parentIndex}
        topCompHeight={topCompHeight}
        updateListLength={updateNestedListsLength}
        totalViewWidth={totalViewWidth}
      >
        {list.map((item, index) =>
          renderNestedListItem({ item, parentIndex, index })
        )}
      </NestedVerticalList>
    ),
    [renderNestedListItem, updateNestedListsLength, translateYs, topCompHeight]
  );

  return data.map(renderNestedVerticalLists);
}

NestedHorizontalList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  updateNestedListsLength: PropTypes.func.isRequired,
  topCompHeight: PropTypes.objectOf(PropTypes.number),
  translateYs: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)),
  renderNestedListItem: PropTypes.func.isRequired,
  totalViewWidth: PropTypes.objectOf(PropTypes.number),
};

export default memo(NestedHorizontalList);
