import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import StoryItem from './StoryItem';
import styles from './styles';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const renderItem = ({ index }) => <StoryItem index={index} />;

const ProfileScreenRow2 = () => {
    return (
        <View>
            <FlatList
                horizontal
                data={data}
                contentContainerStyle={styles.containerHorizontalPadding}
                renderItem={renderItem}
                ItemSeparatorComponent={() => (
                    <View style={styles.width16point5} />
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default ProfileScreenRow2;
