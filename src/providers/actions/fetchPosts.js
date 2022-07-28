import fetchUnsplashPhotos from '../../helperFunctions/fetchUnsplashPhotos';
import {
    FETCHED_POSTS_SUCCESSFULLY,
    FETCH_POSTS_FAILED,
    INITIATE_FETCHING_POSTS
} from './actionTypes';

const fetchPosts = (dispatch) => async () => {
    dispatch({type: INITIATE_FETCHING_POSTS})
    try {
        const rawPhotosArray = await fetchUnsplashPhotos();
        if (rawPhotosArray.length) {
            const photos = rawPhotosArray.map(({ urls, description }) => {
                return { urls, description };
            });
            dispatch({
                type: FETCHED_POSTS_SUCCESSFULLY,
                payload: photos,
            });
        } else {
            throw new Error('empty');
        }
    } catch (err) {
        dispatch({
            type: FETCH_POSTS_FAILED,
            payload: err.message,
        });
    }
};

export default fetchPosts;
