import { LOAD_PERSISTED_STATE_SUCCESSFUL } from './actionTypes';

const fetchPersistedSuccessful = (dispatch) => (payload) =>
    dispatch({
        type: LOAD_PERSISTED_STATE_SUCCESSFUL,
        payload
    });
export default fetchPersistedSuccessful;
