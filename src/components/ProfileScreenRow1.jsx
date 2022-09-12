import { View } from 'react-native';
import EditProfileButton from './EditProfileButton';
import SuggestFollowing from './SuggestFollowing';
import styles from './styles';

const ProfileScreenRow1 = () => {
    return (
        <View
            style={[
                styles.flexDirectionRow,
                styles.editProfileHeight,
                styles.containerHorizontalMargin,
            ]}
        >
            <EditProfileButton />
            <SuggestFollowing />
        </View>
    );
};

export default ProfileScreenRow1;
