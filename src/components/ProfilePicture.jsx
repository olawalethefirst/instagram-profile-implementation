import { View, Image } from 'react-native';
import styles from './styles';
// @ts-ignore
import { profilePicturePath } from '../constants';
import PlusIcon2 from '../SVG/PlusIcon2';
import TextButton from './TextButton';

const ProfilePicture = () => {
    return (
        <TextButton>
            <Image
                source={profilePicturePath}
                style={[styles.profilePicture]}
            />
            <View
                style={[
                    styles.alignItemsCenter,
                    styles.justifyContentCenter,
                    styles.addProfilePicture,
                    styles.positionAbsolute
                ]}
            >
                <PlusIcon2 size={10} />
            </View>
        </TextButton>
    );
};

export default ProfilePicture;
