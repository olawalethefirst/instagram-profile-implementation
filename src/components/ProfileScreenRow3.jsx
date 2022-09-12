import { View, Animated, TouchableOpacity, PanResponder } from 'react-native';
import PostsList from './PostsList';
import { width } from '../constants';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    height,
    headerwithStatusBarHeight,
    postsHeaderHeight,
} from '../constants';
import { TabView, SceneMap } from 'react-native-tab-view'; //uninstall
import { useRef } from 'react';

const ProfileScreenRow3 = ({
    childListView,
    scrollX,
    childList,
    setPostListOffset,
}) => {
    return (
        <View
            ref={childListView}
        >
            <Animated.FlatList
                ref={childList}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                contentContainerStyle={{
                    width: width * 2,
                }}
                pagingEnabled
                horizontal
                data={new Array(2).fill(0)}
                renderItem={({ index }) => <PostsList index={index} />}
                style={{}}
            />
        </View>
    );
};

export default ProfileScreenRow3;
