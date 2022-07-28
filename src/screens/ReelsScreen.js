import { View, Text } from 'react-native'
import styles from './styles';

const ReelsScreen = () => {
  return (
    <View style={[styles.container, styles.justifyContentCenter]}>
      <Text style={[styles.whiteFont, styles.alignTextCenter]}>Reels Screen</Text>
    </View>
  )
}

export default ReelsScreen