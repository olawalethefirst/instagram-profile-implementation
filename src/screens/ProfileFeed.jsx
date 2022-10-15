import React, { memo, useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import NestedLists from "../components/NestedLists";
import ListHeader from "../components/ListHeader";
import StickyHeaderIcon from "../components/StickyHeaderIcon";
import usePosts from "../hooks/usePosts";
import PostItem from "../components/PostItem";
import ErrorModal from "../components/ErrorModal";
import { ViewPost } from "../constants";

const nestedListKeyExtractor = (_, index) => `nestedList-${index}`;
const listItemKeyExtractor = (item) => item.full;

function ProfileFeed({ navigation: { navigate } }) {
  const [
    data,
    stories,
    refreshing,
    loadingMore,
    errors,
    onRefresh,
    onEndReached,
    deleteMostRecentError,
  ] = usePosts(2);

  // helperFunctions
  const navigateToViewPost = useCallback(
    (navigateToViewPostWithParams) =>
      navigate(ViewPost, navigateToViewPostWithParams),
    [navigate]
  );
  const renderItem = useCallback(
    ({ nestedListIndex, index, item }) => {
      const { small, full } = item;
      const navigateToViewPostWithParams = () =>
        navigateToViewPost({
          post: { type: nestedListIndex === 0 ? "Posts" : "Tagged", url: full },
        });
      return (
        <PostItem
          index={index}
          imageUri={small}
          navigateToViewPostWithParams={navigateToViewPostWithParams}
        />
      );
    },
    [navigateToViewPost]
  );

  // eslint-disable-next-line react/prop-types
  const NestedListFooter = memo(({ nestedListIndex }) =>
    loadingMore[nestedListIndex] ? (
      <ActivityIndicator style={styles.nestedListsFooter} color="#fff" />
    ) : null
  );

  return (
    <View style={styles.container}>
      <NestedLists
        HeaderComponent={<ListHeader stories={stories} />}
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

ProfileFeed.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default ProfileFeed;
