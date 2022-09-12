import { Text, Pressable } from 'react-native';
import styles from './styles';

const EditProfileButton = () => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.justifyContentCenter,
                styles.flexGrow,
                styles.editProfileButton,
                pressed ? styles.editProfileButtonPressed : null,
            ]}
        >
            <Text
                style={[
                    styles.whiteText,
                    styles.textAlignCenter,
                    styles.boldText,
                ]}
            >
                Edit Profile
            </Text>
        </Pressable>
    );
};

export default EditProfileButton;
