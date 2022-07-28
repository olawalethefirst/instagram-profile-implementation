import {
    LOAD_PERSISTED_STATE_SUCCESSFUL,
    LOAD_PERSISTED_STATE_FAILED,
    FETCHED_POSTS_SUCCESSFULLY,
    FETCH_POSTS_FAILED,
    INITIATE_FETCHING_POSTS,
} from './actions/actionTypes';

export const initialState = {
    completedPersistState: false,
    posts: [],
    taggedPosts: [],
    postsError: null,
    loadingPosts: false,
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case LOAD_PERSISTED_STATE_SUCCESSFUL:
            return {
                ...payload,
                completedPersistState: true,
            };
        case LOAD_PERSISTED_STATE_FAILED:
            return {
                ...state,
                completedPersistState: true,
            };
        case INITIATE_FETCHING_POSTS:
            return { ...state, loadingPosts: true };
        case FETCHED_POSTS_SUCCESSFULLY:
            console.log('updating posts')
            return {
                ...state,
                posts: [...state.posts, ...payload],
                loadingPosts: false,
            };
        case FETCH_POSTS_FAILED:
            return { ...state, postsError: payload, loadingPosts: false };
        default:
            return state;
    }
};
export default reducer;
