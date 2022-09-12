import { View, Text } from 'react-native'
import styles from './styles';

const ActivityScreen = () => {
  return (
    <View style={[styles.container, styles.justifyContentCenter]}>
      <Text style={[styles.whiteFont, styles.alignTextCenter]}>Activity Screen</Text>
    </View>
  )
}

export default ActivityScreen