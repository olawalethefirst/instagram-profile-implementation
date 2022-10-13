import {
  View,
  // FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { width, height, headerwithStatusBarHeight } from "../constants";
import { AppContext } from "../providers/AppProvider";

const newSquareSize = Math.floor(width / 3);
const middleItem = (width % 3) / 2;

const squareSize = Math.round((width - 2) / 3);
const middleRowHorizontalMargin = (width - squareSize * 3) / 2;

function PostsList({ index }) {
  const isTaggedPosts = index === 1;
  const { state, fetchPosts } = useContext(AppContext);

  // new Api
  const scrollHandler = useAnimatedScrollHandler((e) => {
    console.log(e);
  });

  useEffect(() => {
    if (index === 0) {
      // fetchPosts()
    }
  }, []);

  return (
    <View style={{}}>
      <Animated.FlatList
        numColumns={3}
        style={{}}
        contentContainerStyle={{}}
        bounces={false}
        data={isTaggedPosts ? new Array(10).fill(1) : state.posts}
        renderItem={({ item, index }) => {
          const pos = index + 1;
          const middleRowItem = (pos + 1) % 3 === 0;
          return (
            <TouchableOpacity>
              <Image
                style={{
                  height: squareSize,
                  width: squareSize,
                  backgroundColor: "#fff",
                  marginHorizontal: middleRowItem
                    ? middleRowHorizontalMargin
                    : 0,
                }}
                source={isTaggedPosts ? undefined : { uri: item.urls.small }}
              />
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => (
          <View style={{ height: middleRowHorizontalMargin }} />
        )}
        listKey={index}
        keyExtractor={(item, index) =>
          `${isTaggedPosts ? "taggedPost" : "post"} ${index}`
        }
        scrollEnabled={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      />
    </View>
  );
}

export default PostsList;
