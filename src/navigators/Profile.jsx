import { createStackNavigator } from "@react-navigation/stack";
import { Animated } from "react-native";
import ProfileFeedScreen from "../screens/ProfileFeed";
import ViewPostScreen from "../screens/ViewPost";
import Header from "../components/Header";
import { headerHeight, ProfileFeed, ViewPost, colorBlack } from "../constants";

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
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: headerHeight,
          backgroundColor: colorBlack,
        },
        headerShadowVisible: false,
        header: Header,
      }}
    >
      <Stack.Screen name={ProfileFeed} component={ProfileFeedScreen} />
      <Stack.Screen
        options={{
          cardStyleInterpolator: forScale,
        }}
        name={ViewPost}
        component={ViewPostScreen}
      />
    </Stack.Navigator>
  );
}
