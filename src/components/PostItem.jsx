import { Image } from "react-native";
import { memo } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import isMiddlePostItem from "../helperFunctions/isMiddlePostItem";
import { postItemMargin } from "../constants";

function PostItem({ index, imageUri }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={(e) => console.log("pressed me", e)}
    >
      <Image
        style={[
          styles.postItem,
          {
            marginHorizontal: isMiddlePostItem(index) ? postItemMargin : 0,
          },
        ]}
        source={{ uri: imageUri }}
      />
    </TouchableOpacity>
  );
}

PostItem.propTypes = {
  index: PropTypes.number.isRequired,
  imageUri: PropTypes.string.isRequired,
};

export default memo(PostItem);
