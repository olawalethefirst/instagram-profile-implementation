import { View, Text } from 'react-native';
import styles from './styles';

const SearchScreen = () => {
    return (
        <View style={[styles.container, styles.justifyContentCenter]}>
            <Text style={[styles.whiteFont, styles.alignTextCenter]}>
                Search Screen
            </Text>
        </View>
    );
};

export default SearchScreen;
