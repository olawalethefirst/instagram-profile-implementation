import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchPersistedDataAsync = async () => {
    try {
        const state = await AsyncStorage.getItem('state');
        return state ? JSON.parse(state) : null;
    } catch (err) {
        console.log('error', err);
    }
};

export default fetchPersistedDataAsync;
