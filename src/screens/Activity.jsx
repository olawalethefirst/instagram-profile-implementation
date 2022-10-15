import { View, Text } from "react-native";
import styles from "./styles";

function Activity() {
  return (
    <View style={[styles.container, styles.justifyContentCenter]}>
      <Text style={[styles.whiteFont, styles.alignTextCenter]}>Activity</Text>
    </View>
  );
}

export default Activity;
