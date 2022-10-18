import { createStackNavigator } from "@react-navigation/stack";
import { Animated } from "react-native";
import ProfileFeedScreen from "../screens/ProfileFeed";
import ViewProfilePostScreen from "../screens/ViewProfilePost";
import ProfileHeader from "../components/ProfileHeader";
import {
  headerHeight,
  ProfileFeed,
  ViewProfilePost,
  colorBlack,
} from "../constants";
import ProfilePostsProvider from "../providers/ProfilePostsProvider";

const Stack = createStackNavigator();

const forScale = ({ current, next, inverted }) => {
  return {
    containerStyle: {
      transform: [
        {
          scale: Animated.multiply(
            Animated.add(
              current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: "clamp",
              }),
              next?.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: "clamp",
              }) ?? 0
            ),
            inverted
          ),
        },
      ],
    },
  };
};

export default function Profile() {
  return (
    <ProfilePostsProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: headerHeight,
            backgroundColor: colorBlack,
          },
          headerShadowVisible: false,
          header: ProfileHeader,
        }}
      >
        <Stack.Screen
          options={{
            cardStyleInterpolator: forScale,
          }}
          name={ProfileFeed}
          component={ProfileFeedScreen}
        />
        <Stack.Screen
          options={{
            cardStyleInterpolator: forScale,
          }}
          name={ViewProfilePost}
          component={ViewProfilePostScreen}
        />
      </Stack.Navigator>
    </ProfilePostsProvider>
  );
}
