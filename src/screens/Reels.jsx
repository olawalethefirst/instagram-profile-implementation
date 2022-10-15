import { View, Text } from "react-native";
import styles from "./styles";

function Reels() {
  return (
    <View style={[styles.container, styles.justifyContentCenter]}>
      <Text style={[styles.whiteFont, styles.alignTextCenter]}>Reels </Text>
    </View>
  );
}

export default Reels;
