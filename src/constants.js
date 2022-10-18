import Constants from "expo-constants";
import { Dimensions, Platform, PixelRatio } from "react-native";

// boolean
export const isIOS = Platform.OS === "ios";

// strings
export const Home = "Home";
export const Search = "Search";
export const Reels = "Reels";
export const Activity = "Activity";
export const Profile = "Profile";
export const ProfileFeed = "ProfileFeed";
export const ViewProfilePost = "ViewProfilePost";
export const username = "olawalethefirst";

export const deviceFont = Platform.select({
  ios: "HelveticaNeue-Bold",
  android: "Roboto",
});
export const randomPhotosURL =
  "https://pfuu3ai4el.execute-api.eu-west-2.amazonaws.com/production/randomphotos";
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
export const dpr = PixelRatio.get();
export const storySize = 56;
export const storyContainerSize = 66;
