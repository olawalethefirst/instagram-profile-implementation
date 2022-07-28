import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ReelsScreen from '../screens/ReelsScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
    Home,
    Search,
    Reels,
    Activity,
    Profile,
    colorBlack,
    headerHeight,
} from '../constants';
import Header from '../components/Header';
import TabBarIcon from '../components/TabBarIcon';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={Profile}
            screenOptions={({ route: { name } }) => ({
                header: (props) => <Header {...props} />,
                tabBarIcon: (props) => <TabBarIcon {...props} name={name} />,
                tabBarStyle: {
                    backgroundColor: colorBlack,
                    borderTopColor: colorBlack,
                },
                tabBarShowLabel: false,
                headerStyle: {
                    height: headerHeight,
                },
            })}
        >
            <Tab.Screen name={Home} component={HomeScreen} />
            <Tab.Screen name={Search} component={SearchScreen} />
            <Tab.Screen name={Reels} component={ReelsScreen} />
            <Tab.Screen name={Activity} component={ActivityScreen} />
            <Tab.Screen name={Profile} component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
