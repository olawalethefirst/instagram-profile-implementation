import { LOAD_PERSISTED_STATE_FAILED } from './actionTypes';

const fetchPersistedFailed = (dispatch) => () => {
    dispatch({
        type: LOAD_PERSISTED_STATE_FAILED,
    });
};

export default fetchPersistedFailed;
