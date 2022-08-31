import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export default function NestedList({ translateYs, index }) {
    const animatedStyle = useAnimatedStyle(() => ({}));

    return (
        <Animated.View style={[animatedStyle]}>
            <Text>NestedList</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({});
