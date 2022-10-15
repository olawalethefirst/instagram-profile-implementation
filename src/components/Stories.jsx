import { View, FlatList } from "react-native";
import { memo } from "react";
import PropTypes from "prop-types";
import StoryItem from "./StoryItem";
import styles from "./styles";

function ItemSeparator() {
  return <View style={styles.width16point5} />;
}
const renderItem = ({ index, item }) => {
  const { small } = item;
  return <StoryItem index={index} uri={small} />;
};

function Stories({ data }) {
  return (
    <View>
      <FlatList
        horizontal
        data={data}
        contentContainerStyle={styles.containerHorizontalPadding}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={StoryItem}
      />
    </View>
  );
}

Stories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default memo(Stories);
