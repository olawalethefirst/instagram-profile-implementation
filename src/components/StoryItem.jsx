import { View, Image, Text } from "react-native";
import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./styles";
import PlusIcon2 from "../SVG/PlusIcon2";
import TextButton from "./TextButton";

function StoryItem({ index, uri }) {
  return (
    <TextButton style={styles.storyItemContainer}>
      <View
        style={[
          styles.storyImageContainer1,
          styles.alignItemsCenter,
          styles.justifyContentCenter,
        ]}
      >
        <View
          style={[
            styles.storyImageContainer2,
            styles.justifyContentCenter,
            styles.alignItemsCenter,
            styles.backgroundColorBlack,
          ]}
        >
          {uri && <Image style={styles.storyItemImage} source={{ uri }} />}
          {!uri && <PlusIcon2 size={20} stroke={1} />}
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.fontSize11,
          styles.marginTop8,
          styles.whiteText,
          styles.textAlignCenter,
        ]}
        ellipsizeMode="tail"
      >
        {index ?? "New"}
      </Text>
    </TextButton>
  );
}

StoryItem.defaultProps = {
  uri: null,
  index: null,
};

StoryItem.propTypes = {
  index: PropTypes.number,
  uri: PropTypes.string,
};

export default memo(StoryItem);
