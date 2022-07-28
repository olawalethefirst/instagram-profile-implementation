import { createContext, useReducer, useEffect, useCallback } from 'react';
import fetchPersistedSuccessful from './actions/fetchPersistedSuccessful';
import fetchPersistedFailed from './actions/fetchPersistedFailed';
import reducer, { initialState } from './reducer';
import fetchPersistedDataAsync from '../helperFunctions/fetchPersistedDataAsync';
import persistData from '../helperFunctions/persistData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPosts from './actions/fetchPosts'


const remember = () => {
    //REMEMBER TO REMOVE APIKEY FROM FETCHPHOTOS  

}

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, fetchPosts: fetchPosts(dispatch) };
    
    const fetchPersistedData = useCallback(async () => {
        try {
            // await AsyncStorage.removeItem('state');
            // console.log('done');
            const persistedState = await fetchPersistedDataAsync();
            if (persistedState) {
                fetchPersistedSuccessful(dispatch)(persistedState);
            } else {
                throw new Error();
            }
            console.log('completed update from persistence');
        } catch {
            fetchPersistedFailed(dispatch)();
            console.log('failed');
        }
    }, []);

    useEffect(() => {
        fetchPersistedData();
    }, []);

    useEffect(() => {
        if (state.completedPersistState) {
            console.log('attempting to persist state');
            persistData(state);
        }
    }, [state]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
