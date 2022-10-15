import { View } from "react-native";
import PropTypes from "prop-types";
import ProfileScreenRow0 from "./ProfileScreenRow0";
import ProfileScreenRow1 from "./ProfileScreenRow1";
import Stories from "./Stories";
import screenStyles from "../screens/styles";

export default function ListHeader({ stories }) {
  return (
    <>
      <ProfileScreenRow0 />
      <View style={screenStyles.profileScreenSpacer} />
      <ProfileScreenRow1 />
      <View style={screenStyles.profileScreenSpacer} />
      <Stories data={stories} />
      <View style={screenStyles.profileScreenSpacer} />
    </>
  );
}

ListHeader.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
