import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Feed";
import SearchScreen from "../screens/Search";
import ReelsScreen from "../screens/Reels";
import ActivityScreen from "../screens/Activity";
import {
  Home,
  Search,
  Reels,
  Activity,
  Profile,
  colorBlack,
} from "../constants";
import TabBarIcon from "../components/TabBarIcon";
import ProfileStack from "./Profile";

const Tab = createBottomTabNavigator();

function Root() {
  return (
    <Tab.Navigator
      initialRouteName={Profile}
      screenOptions={({ route: { name } }) => ({
        headerShown: false,
        // eslint-disable-next-line react/prop-types, react/no-unstable-nested-components
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={name} />
        ),
        tabBarStyle: {
          backgroundColor: colorBlack,
          borderTopColor: colorBlack,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name={Home} component={HomeScreen} />
      <Tab.Screen name={Search} component={SearchScreen} />
      <Tab.Screen name={Reels} component={ReelsScreen} />
      <Tab.Screen name={Activity} component={ActivityScreen} />
      <Tab.Screen name={Profile} component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default Root;
