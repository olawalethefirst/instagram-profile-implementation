import { Text, View } from "react-native";
import styles from "./styles";

function Feed() {
  return (
    <View style={[styles.container, styles.justifyContentCenter]}>
      <Text style={[styles.whiteFont, styles.alignTextCenter]}>Feed</Text>
    </View>
  );
}

export default Feed;
