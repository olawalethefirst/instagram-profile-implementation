import React, { useState, useCallback, memo } from 'react';
import { View, FlatList, Image } from 'react-native';
import styles from './styles';
import NestedLists from '../components/NestedLists';
import ProfileScreenRow0 from '../components/ProfileScreenRow0';
import ProfileScreenRow1 from '../components/ProfileScreenRow1';
import ProfileScreenRow2 from '../components/ProfileScreenRow2';

const getColor = (nestedListIndex) => `rgb(${(121 * (nestedListIndex + 1) + 255) % 255}, ${
  (99 * (nestedListIndex + 1) + 255) % 255
}, ${(169 * (nestedListIndex + 1) + 255) % 255})`;

const ListItem = memo(({ item, parentIndex, index }) => (
  <View
    style={{
      height: 100,
      borderWidth: 1,
      borderColor: '#fff',
      backgroundColor: getColor(parentIndex),
    }}

  >
    <Image />
  </View>
));

const data = [
  new Array(20).fill(1),
  new Array(1).fill(1),
  new Array(30).fill(1),
  new Array(10).fill(1),
  new Array(5).fill(1),
];

function TopComp() {
  return (

    <>
      <ProfileScreenRow0 />
      <View style={styles.profileScreenSpacer} />
      <ProfileScreenRow1 />
      <View style={styles.profileScreenSpacer} />
      <ProfileScreenRow2 />
      <View style={styles.profileScreenSpacer} />
    </>
  );
}

function ProfileScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback((i) => {
    setRefreshing(true);
    // console.log('refreshed a bitch');
    setTimeout(() => {
      // console.log('finished refreshing');
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderItem = useCallback(({ item, parentIndex, index }) => (
    <ListItem
      key={`parentIndex-${parentIndex}index-${index}`}
      item={item}
      parentIndex={parentIndex}
      index={index}
    />
  ), []);

  // console.log('emi ti update ni temi', refreshing);

  return (
    <NestedLists
      HeaderComponent={TopComp}
      data={data}
      renderListItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

export default ProfileScreen;
