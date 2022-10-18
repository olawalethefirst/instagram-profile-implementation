import { View } from "react-native";
import styles from "./styles";
import PlusIcon2 from "../svg/PlusIcon2";
import TextButton from "./TextButton";
import ProfileImage from "./ProfileImage";

function ProfilePicture() {
  return (
    <TextButton>
      <ProfileImage style={[styles.profilePicture]} />
      <View
        style={[
          styles.alignItemsCenter,
          styles.justifyContentCenter,
          styles.addProfilePicture,
          styles.positionAbsolute,
        ]}
      >
        <PlusIcon2 size={10} />
      </View>
    </TextButton>
  );
}

export default ProfilePicture;
