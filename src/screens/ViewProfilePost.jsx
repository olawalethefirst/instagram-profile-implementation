import { FlatList } from "react-native";
import { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { ProfilePostsContext } from "../providers/ProfilePostsProvider";
import ProfilePost from "../components/ProfilePost";
import { width } from "../constants";
import styles from "./styles";
import generateImageUri from "../helperFunctions/generateImageUri";

const itemHeight = 120 + width;

const getItemLayout = (data, index) => ({
  length: itemHeight,
  offset: index * itemHeight,
  index,
});

function ViewProfilePost({
  route: {
    params: {
      post: { nestedListIndex, activeIndex },
    },
  },
}) {
  const { posts, updateLiked, updateSaved } = useContext(ProfilePostsContext);
  const renderItem = useCallback(
    ({ item, index }) => {
      const {
        urls: { raw },
        liked,
        saved,
      } = item;
      const uri = generateImageUri(raw, width);
      return (
        <ProfilePost
          uri={uri}
          liked={liked}
          saved={saved}
          updateLiked={() => updateLiked(index, nestedListIndex)}
          updateSaved={() => updateSaved(index, nestedListIndex)}
        />
      );
    },
    [updateLiked, updateSaved, nestedListIndex]
  );

  return (
    <FlatList
      style={[styles.container]}
      contentContainerStyle={styles.backgroundColorBlack}
      data={posts[nestedListIndex]}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      initialScrollIndex={activeIndex}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      windowSize={3}
      updateCellsBatchingPeriod={5}
    />
  );
}

ViewProfilePost.propTypes = {
  route: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
};

export default ViewProfilePost;
