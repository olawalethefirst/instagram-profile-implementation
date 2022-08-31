import { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import NestedVerticalLists from '../components/NestedVerticalLists.js';
import ProfileScreenRow0 from '../components/ProfileScreenRow0';
import ProfileScreenRow1 from '../components/ProfileScreenRow1';
import ProfileScreenRow2 from '../components/ProfileScreenRow2';

const ProfileScreen = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log('refreshed a bitch');
        setTimeout(() => {
            console.log('finished refreshing');
            setRefreshing(false);
        }, 1500);
    }, []);

    return (
        <NestedVerticalLists
            topComp={
                <>
                    <ProfileScreenRow0 />
                    <View style={styles.profileScreenSpacer} />
                    <ProfileScreenRow1 />
                    <View style={styles.profileScreenSpacer} />
                    <ProfileScreenRow2 />
                    <View style={styles.profileScreenSpacer} />
                </>
            }
            list1={new Array(20).fill(1)}
            list2={new Array(1).fill(1)}
            renderList={(_, i) => (
                <View
                    style={{
                        height: 100,
                        borderWidth: 1,
                        borderColor: '#fff',
                        backgroundColor: 'red',
                    }}
                    key={i}
                />
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
};

export default ProfileScreen;
