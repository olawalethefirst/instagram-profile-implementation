import { View } from "react-native";
import ProfilePicture from "./ProfilePicture";
import ProfileDetailsDuos from "./ProfileDetailsDuos";
import styles from "./styles";

function ProfileScreenRow0() {
  return (
    <View style={styles.containerHorizontalMargin}>
      <View
        style={[
          styles.flexDirectionRow,
          styles.justifyContentSpaceBetween,
          styles.marginTop16point5,
        ]}
      >
        <ProfilePicture />
        <View style={[styles.alignItemsCenter, styles.flexDirectionRow]}>
          <ProfileDetailsDuos
            text1="20"
            text2="Posts"
            style={styles.marginRight13}
          />
          <ProfileDetailsDuos
            text1="200"
            text2="Followers"
            style={styles.marginRight13}
          />
          <ProfileDetailsDuos text1="100" text2="Following" />
        </View>
      </View>
      <ProfileDetailsDuos
        text1="Olawale Bashiru"
        text2="Software Developer"
        style={styles.marginTop8}
        textAlign="left"
      />
    </View>
  );
}

export default ProfileScreenRow0;
