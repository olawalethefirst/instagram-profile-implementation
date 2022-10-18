import React, { isValidElement } from "react";
import { View, Platform } from "react-native";
import Animated from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import PropTypes from "prop-types";
import RefreshControl from "./RefreshControl";
import NestedHorizontalList from "./NestedHorizontalList";
import useNestedList from "./hooks/useNestedList";
import styles from "./styles";
import NestedListsStickyHeader from "./NestedListsStickyHeader";

const GestureContainer =
  Platform.OS === "android" ? gestureHandlerRootHOC(View) : View;

function NestedLists({
  HeaderComponent,
  renderListItem,
  refreshing,
  onRefresh,
  data,
  listItemKeyExtractor,
  nestedListKeyExtractor,
  useReanimatedUIThread,
  onVerticalScroll,
  onHorizontalScroll,
  nestedListsStickyHeaderEnabled,
  StickyHeaderIcon,
  listBackgroundColor,
  NestedListFooterComponent,
  onEndReached,
  stickyHeaderScrollIndicatorColor,
  nestedListContentContainerStyle,
  NestedListHeaderComponent,
  onEndReachedThreshold,
}) {
  const {
    updateTotalViewLayout,
    gestureHandlers,
    refreshAnimationProgress,
    refreshingActive,
    listContainerAnimatedStyle,
    updateHeaderHeight,
    horizontalListAnimatedContainerStyle,
    updateStickyHeaderHeight,
    scrollToNestedListIndex,
    activeNestedListIndex,
    translateXEffective,
    useNestedVerticalListProp,
  } = useNestedList(
    data,
    refreshing,
    onRefresh,
    useReanimatedUIThread,
    onVerticalScroll,
    onHorizontalScroll,
    onEndReached,
    onEndReachedThreshold
  );

  return (
    <GestureContainer
      onLayout={updateTotalViewLayout}
      style={[styles.flex1, { backgroundColor: listBackgroundColor }]}
      collapsable={false}
    >
      {/* @ts-ignore */}
      <GestureDetector gesture={Gesture.Exclusive(...gestureHandlers)}>
        <View collapsable={false} style={[styles.flex1]}>
          <Animated.View style={styles.refreshContainer}>
            <RefreshControl
              size={25}
              refreshAnimationProgress={refreshAnimationProgress}
              refreshingActive={refreshingActive}
              refreshing={refreshing}
            />
          </Animated.View>
          <Animated.View
            collapsable={false}
            style={[
              listContainerAnimatedStyle,
              { backgroundColor: listBackgroundColor },
            ]}
          >
            <View onLayout={updateHeaderHeight} collapsable={false}>
              <View collapsable={false}>
                {isValidElement(HeaderComponent) ? (
                  HeaderComponent
                ) : (
                  <HeaderComponent />
                )}
              </View>
            </View>
            <Animated.View
              style={[
                styles.zIndex1,
                {
                  backgroundColor: listBackgroundColor,
                },
              ]}
              onLayout={updateStickyHeaderHeight}
            >
              {nestedListsStickyHeaderEnabled ? (
                <NestedListsStickyHeader
                  StickyHeaderIcon={StickyHeaderIcon}
                  nestedListsCount={data.length}
                  scrollToNestedListIndex={scrollToNestedListIndex}
                  activeNestedListIndex={activeNestedListIndex}
                  translateXEffective={translateXEffective}
                  stickyHeaderScrollIndicatorColor={
                    stickyHeaderScrollIndicatorColor
                  }
                />
              ) : null}
            </Animated.View>
            <Animated.View
              collapsable={false}
              style={[
                styles.flexDirectionRow,
                horizontalListAnimatedContainerStyle,
              ]}
            >
              <NestedHorizontalList
                data={data}
                renderListItem={renderListItem}
                useNestedVerticalListProp={useNestedVerticalListProp}
                listItemKeyExtractor={listItemKeyExtractor}
                nestedListKeyExtractor={nestedListKeyExtractor}
                NestedListHeaderComponent={NestedListHeaderComponent}
                NestedListFooterComponent={NestedListFooterComponent}
                nestedListContentContainerStyle={
                  nestedListContentContainerStyle
                }
              />
            </Animated.View>
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureContainer>
  );
}

NestedLists.defaultProps = {
  HeaderComponent: null,
  listItemKeyExtractor: undefined,
  nestedListKeyExtractor: undefined,
  useReanimatedUIThread: false,
  onVerticalScroll: undefined,
  onHorizontalScroll: undefined,
  StickyHeaderIcon: null,
  listBackgroundColor: "#fff",
  nestedListsStickyHeaderEnabled: false,
  NestedListFooterComponent: null,
  onEndReached: () => {},
  stickyHeaderScrollIndicatorColor: "#000",
  nestedListContentContainerStyle: {},
  NestedListHeaderComponent: null,
  onEndReachedThreshold: 0.1,
};

NestedLists.propTypes = {
  HeaderComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
  ]),
  renderListItem: PropTypes.func.isRequired,
  refreshing: PropTypes.arrayOf(PropTypes.bool).isRequired,
  onRefresh: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  listItemKeyExtractor: PropTypes.func,
  nestedListKeyExtractor: PropTypes.func,
  useReanimatedUIThread: PropTypes.bool,
  onVerticalScroll: PropTypes.func,
  onHorizontalScroll: PropTypes.func,
  nestedListsStickyHeaderEnabled: PropTypes.bool,
  StickyHeaderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  listBackgroundColor: PropTypes.string,
  NestedListFooterComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
  ]),
  onEndReached: PropTypes.func,
  stickyHeaderScrollIndicatorColor: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  nestedListContentContainerStyle: PropTypes.object,
  NestedListHeaderComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
  ]),
  onEndReachedThreshold: PropTypes.number,
};

export default React.memo(NestedLists);
