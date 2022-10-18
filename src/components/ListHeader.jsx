import { View } from "react-native";
import PropTypes from "prop-types";
import ProfileScreenBio from "./ProfileScreenBio";
import EditProfileButton from "./EditProfileButton";
import SuggestFollowing from "./SuggestFollowing";
import Stories from "./Stories";
import screenStyles from "../screens/styles";
import styles from "./styles";

export default function ListHeader({ stories }) {
  return (
    <>
      <ProfileScreenBio />
      <View style={screenStyles.profileScreenSpacer} />
      <View
        style={[
          styles.flexDirectionRow,
          styles.editProfileHeight,
          styles.containerHorizontalMargin,
        ]}
      >
        <EditProfileButton />
        <SuggestFollowing />
      </View>
      <View style={screenStyles.profileScreenSpacer} />
      <Stories data={stories} />
      <View style={screenStyles.profileScreenSpacer} />
    </>
  );
}

ListHeader.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
