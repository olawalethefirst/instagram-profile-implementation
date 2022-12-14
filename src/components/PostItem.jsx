import { Image } from "react-native";
import { memo } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import isMiddlePostItem from "../helperFunctions/isMiddlePostItem";
import { postItemMargin } from "../constants";

function PostItem({ index, uri, navigateToViewPostWithParams }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={navigateToViewPostWithParams}
    >
      <Image
        style={[
          styles.postItem,
          {
            marginHorizontal: isMiddlePostItem(index) ? postItemMargin : 0,
          },
        ]}
        source={{ uri }}
      />
    </TouchableOpacity>
  );
}

PostItem.propTypes = {
  index: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
  navigateToViewPostWithParams: PropTypes.func.isRequired,
};

export default memo(PostItem);
