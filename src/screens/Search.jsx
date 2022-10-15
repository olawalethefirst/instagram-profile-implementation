import { View, Text } from "react-native";
import styles from "./styles";

function Search() {
  return (
    <View style={[styles.container, styles.justifyContentCenter]}>
      <Text style={[styles.whiteFont, styles.alignTextCenter]}>Search</Text>
    </View>
  );
}

export default Search;
