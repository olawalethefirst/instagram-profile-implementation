import React, { memo, useCallback, useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import NestedLists from "../components/NestedLists";
import ListHeader from "../components/ListHeader";
import StickyHeaderIcon from "../components/StickyHeaderIcon";
import PostItem from "../components/PostItem";
import ErrorModal from "../components/ErrorModal";
import {
  ViewProfilePost,
  postItemSize,
  colorBlack,
  colorWhite,
} from "../constants";
import { ProfilePostsContext } from "../providers/ProfilePostsProvider";
import generateImageUri from "../helperFunctions/generateImageUri";

const nestedListKeyExtractor = (_, index) => `nestedList-${index}`;
const listItemKeyExtractor = (item, index, nestedListIndex) =>
  item.urls.full + index + nestedListIndex;

function ProfileFeed({ navigation: { navigate } }) {
  const {
    posts,
    stories,
    refreshing,
    loadingMore,
    errors,
    onRefresh,
    onEndReached,
    deleteMostRecentError,
  } = useContext(ProfilePostsContext);

  // helperFunctions
  const navigateToViewPost = useCallback(
    (params) => navigate(ViewProfilePost, params),
    [navigate]
  );
  const renderItem = useCallback(
    ({ nestedListIndex, index, item }) => {
      const {
        urls: { raw },
      } = item;
      const uri = generateImageUri(raw, postItemSize);
      const navigateToViewPostWithParams = () =>
        navigateToViewPost({
          post: {
            nestedListIndex,
            type: nestedListIndex === 0 ? "Posts" : "Tagged",
            activeIndex: index,
          },
        });
      return (
        <PostItem
          index={index}
          uri={uri}
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
        data={posts}
        renderListItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        nestedListsStickyHeaderEnabled
        listBackgroundColor={colorBlack}
        NestedListFooterComponent={NestedListFooter}
        stickyHeaderScrollIndicatorColor={colorWhite}
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
