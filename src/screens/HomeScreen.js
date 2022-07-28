import { Text, View } from 'react-native';
import styles from './styles';

const HomeScreen = () => {
    return (
        <View style={[styles.container, styles.justifyContentCenter]}>
            <Text style={[styles.whiteFont, styles.alignTextCenter]}>
                Home Screen
            </Text>
        </View>
    );
};

export default HomeScreen;
