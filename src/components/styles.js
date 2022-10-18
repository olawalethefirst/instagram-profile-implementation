import { StyleSheet } from "react-native";
import {
  headerwithStatusBarHeight,
  headerHeight,
  colorWhite,
  colorBlack,
  deviceFont,
  color0294F7,
  color5a5a5a,
  color757575,
  color2b2b2b,
  postsHeaderHeight,
  postItemSize,
  postItemMargin,
  storySize,
  storyContainerSize,
} from "../constants";

const styles = StyleSheet.create({
  headerWithStatusBarHeight: {
    height: headerwithStatusBarHeight,
  },
  headerHeight: {
    height: headerHeight,
  },
  containerHorizontalPadding: {
    paddingHorizontal: 16.5,
  },
  backgroundColorBlack: {
    backgroundColor: colorBlack,
  },
  whiteText: {
    color: colorWhite,
  },
  fontSize24: {
    fontSize: 24,
  },
  defaultDeviceFont: {
    fontFamily: deviceFont,
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  marginTop4: {
    marginTop: 4,
  },
  justifyContentSpaceBetween: {
    justifyContent: "space-between",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  marginRight25: {
    marginRight: 25,
  },
  profilePicture: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  addProfilePicture: {
    height: 25,
    width: 25,
    backgroundColor: color0294F7,
    borderRadius: 25 / 2,
    bottom: 0,
    right: 0,
    borderWidth: 2,
  },
  profileDetailsDuoText1: {
    fontFamily: deviceFont,
    fontSize: 16,
    marginBottom: 2,
  },
  profileDetailsDuoText2: {
    fontSize: 12,
    fontFamily: deviceFont,
  },
  suggestFollowing: {
    width: 36,
    borderColor: color5a5a5a,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  flexGrow: {
    flexGrow: 1,
  },
  editProfileButton: {
    flexGrow: 1,
    borderColor: color5a5a5a,
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 5,
    justifyContent: "center",
  },
  editProfileButtonPressed: {
    backgroundColor: color5a5a5a,
    borderColor: color757575,
  },
  containerHorizontalMargin: {
    marginHorizontal: 16.5,
  },
  marginTop16point5: {
    marginTop: 16.5,
  },
  marginRight13: {
    marginRight: 13,
  },
  marginTop8: {
    marginTop: 8,
  },
  editProfileHeight: {
    height: 38,
  },
  storyImageContainer1: {
    height: storyContainerSize,
    width: storyContainerSize,
    borderRadius: storyContainerSize / 2,
    borderWidth: 1,
    borderColor: color5a5a5a,
  },
  storyImageContainer2: {
    borderRadius: 35,
    padding: 3,
  },
  storyItemImage: {
    height: storySize,
    width: storySize,
    borderRadius: storySize / 2,
  },
  width16point5: {
    width: 16.5,
  },
  marginLeft16point5: {
    marginLeft: 16.5,
  },
  boldText: {
    fontWeight: "bold",
  },
  fontWeight500: {
    fontWeight: "500",
  },
  storyItemContainer: {
    width: 72,
  },
  fontSize11: {
    fontSize: 11,
  },
  positionAbsolute: {
    position: "absolute",
  },
  postsHeader: {
    height: postsHeaderHeight,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    paddingBottom: 2,
  },
  flex1: {
    flex: 1,
  },
  backgroundColorWhite: {
    backgroundColor: colorWhite,
  },
  postsScrollIndicator: {
    height: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  postItem: {
    width: postItemSize,
    height: postItemSize,
    marginBottom: postItemMargin,
    backgroundColor: color2b2b2b,
  },
  errorModal: {
    position: "absolute",
    height: 50,
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: color2b2b2b,
    alignItems: "center",
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    flexDirection: "row",
  },
  errorModalText: { color: "#fff", fontFamily: deviceFont, fontWeight: "600" },
  alertIcon: { marginRight: 15 },
  viewPostHeaderContainer: {
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "white",
    shadowRadius: 1,
    shadowOpacity: 0.15,
    backgroundColor: "black",
  },
  viewPostHeaderTitle: {
    color: color757575,
    fontSize: 14,
  },
  viewPostHeaderSubTitle: {
    fontWeight: "900",
    fontSize: 17,
  },
  viewPostHeaderBackButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 40,
    zIndex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
  fontSize16: {
    fontSize: 16,
  },
  profilePostHeaderProfileImage: {
    width: 35,
    aspectRatio: 1,
    borderRadius: 17.5,
    marginRight: 12,
  },
  marginRight20: {
    marginRight: 20,
  },
});

export default styles;
