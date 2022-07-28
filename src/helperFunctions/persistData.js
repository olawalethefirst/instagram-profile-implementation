import AsyncStorage from '@react-native-async-storage/async-storage';

const persistData = async (state) => {
    try {
        await AsyncStorage.setItem('state', JSON.stringify(state));
        console.log('updated persistence');
    } catch (err) {
        console.log('error', err);
    }
};

export default persistData;
