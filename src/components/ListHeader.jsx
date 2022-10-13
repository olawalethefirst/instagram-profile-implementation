import { View } from "react-native";
import ProfileScreenRow0 from "./ProfileScreenRow0";
import ProfileScreenRow1 from "./ProfileScreenRow1";
import ProfileScreenRow2 from "./ProfileScreenRow2";
import screenStyles from "../screens/styles";

export default function ListHeader() {
  return (
    <>
      <ProfileScreenRow0 />
      <View style={screenStyles.profileScreenSpacer} />
      <ProfileScreenRow1 />
      <View style={screenStyles.profileScreenSpacer} />
      <ProfileScreenRow2 />
      <View style={screenStyles.profileScreenSpacer} />
    </>
  );
}

ListHeader.propTypes = {};
