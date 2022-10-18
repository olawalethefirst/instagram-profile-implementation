import { Pressable } from "react-native";
import SuggestFollowingIcon from "../svg/SuggestFollowingIcon";
import styles from "./styles";

function SuggestFollowing() {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.suggestFollowing,
        pressed ? styles.editProfileButtonPressed : null,
      ]}
    >
      <SuggestFollowingIcon width={18} />
    </Pressable>
  );
}

export default SuggestFollowing;
