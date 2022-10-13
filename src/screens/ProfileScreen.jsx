import React, { memo } from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";
import NestedLists from "../components/NestedLists";
import ListHeader from "../components/ListHeader";
import StickyHeaderIcon from "../components/StickyHeaderIcon";
import usePosts from "../hooks/usePosts";
import PostItem from "../components/PostItem";
import ErrorModal from "../components/ErrorModal";

const renderItem = ({ index, item }) => {
  const { small } = item;
  return <PostItem index={index} imageUri={small} />;
};

const nestedListKeyExtractor = (_, index) => `nestedList-${index}`;
const listItemKeyExtractor = (item) => item.full;

function ProfileScreen() {
  const [
    data,
    refreshing,
    loadingMore,
    errors,
    onRefresh,
    onEndReached,
    deleteMostRecentError,
  ] = usePosts(2);

  // eslint-disable-next-line react/prop-types
  const NestedListFooter = memo(({ nestedListIndex }) =>
    loadingMore[nestedListIndex] ? (
      <ActivityIndicator style={styles.nestedListsFooter} color="#fff" />
    ) : null
  );

  return (
    <View style={styles.container}>
      <NestedLists
        HeaderComponent={ListHeader}
        data={data}
        renderListItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        headerContainerStyle={{ zIndex: 1 }}
        nestedListContainerStyle={{ paddingTop: 60 }}
        nestedListsStickyHeaderEnabled
        listBackgroundColor="#000"
        NestedListFooterComponent={NestedListFooter}
        stickyHeaderScrollIndicatorColor="#fff"
        nestedListContentContainerStyle={styles.nestedListContentContainerStyle}
        StickyHeaderIcon={StickyHeaderIcon}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        nestedListKeyExtractor={nestedListKeyExtractor}
        listItemKeyExtractor={listItemKeyExtractor}
      />
      <ErrorModal
        errors={errors}
        deleteMostRecentError={deleteMostRecentError}
      />
    </View>
  );
}

export default ProfileScreen;
