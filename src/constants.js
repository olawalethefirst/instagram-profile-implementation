import Constants from "expo-constants";
import { Dimensions, Platform } from "react-native";

// boolean
export const isIOS = Platform.OS === "ios";

// strings
export const Home = "Home";
export const Search = "Search";
export const Reels = "Reels";
export const Activity = "Activity";
export const Profile = "Profile";

export const deviceFont = Platform.select({
  ios: "HelveticaNeue-Bold",
  android: "Roboto",
});
export const randomPhotosURL =
  "https://pfuu3ai4el.execute-api.eu-west-2.amazonaws.com/production/randomphotos";
export const profilePicturePath = require("../assets/images/profilePicture.webp");
// colors
export const colorBlack = "#000";
export const colorWhite = "#fff";
export const color0294F7 = "#0294F7"; // blue shade
export const color757575 = "#757575"; // light grey shade
export const color5a5a5a = "#5a5a5a"; // dark grey shade
export const color2b2b2b = "#2b2b2b"; // very dark grey shade

// numbers
export const { width, height } = Dimensions.get("screen");
export const { statusBarHeight } = Constants;
export const headerHeight = 54;
export const postsHeaderHeight = 50;
export const headerwithStatusBarHeight = headerHeight + statusBarHeight;
export const activeOpacity = 0.7;
export const postItemSize = (width - 2) / 3;
export const postItemMargin = 1;

// arrays
export const storyImageLinks = [];

// functions
export const storyPathParser = (index) => {
  switch (index) {
    case 0:
      return require("../assets/images/story0.webp");
    case 1:
      return require("../assets/images/story1.webp");
    case 2:
      return require("../assets/images/story2.webp");
    case 3:
      return require("../assets/images/story3.webp");
    case 4:
      return require("../assets/images/story4.webp");
    case 5:
      return require("../assets/images/story5.webp");
    case 6:
      return require("../assets/images/story6.webp");
    case 7:
      return require("../assets/images/story7.webp");
    case 8:
      return require("../assets/images/story8.webp");
    case 9:
      return require("../assets/images/story9.webp");
    default:
  }
};
export const storyCaptionParser = (index) => {
  switch (index) {
    case 0:
      return "Food Porn";
    case 1:
      return "Food Art";
    case 2:
      return "Mountain Glacier";
    case 3:
      return "Highrise";
    case 4:
      return "Tallest animal";
    case 5:
      return "Island";
    case 6:
      return "Lake";
    case 7:
      return "Beach";
    case 8:
      return "Doggy";
    case 9:
      return "Island Mountain";
    case 10:
      return "New";
    default:
  }
};
