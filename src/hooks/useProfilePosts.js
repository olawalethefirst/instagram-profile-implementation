import { useReducer, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchRandomPhotosAsync from "../helperFunctions/fetchRandomPhotosAsync";
import mapArrayWithUpdate from "../helperFunctions/mapArrayWithUpdate";

// constants
const USER_POSTS = "USER_POSTS";
const TAGGED_POSTS = "TAGGED_POSTS";
const STORIES = "STORIES";
const POSTS_BATCH_COUNT = 15;
const USER_POSTS_MAXIMUM_COUNT = 60;
const TAGGED_POSTS_MAXIMUM_COUNT = 9;
const postsMaxCount = [USER_POSTS_MAXIMUM_COUNT, TAGGED_POSTS_MAXIMUM_COUNT];
// actions
const UPDATE_DATA = "UPDATE_DATA";
const ACTIVATE_REFRESHING = "ACTIVATE_REFRESHING";
const REFRESHING_SUCCESSFUL = "REFRESHING_SUCCESSFUL";
const REFRESHING_UN_SUCCESSFUL = "REFRESHING_UN_SUCCESSFUL";
const ACTIVATE_LOADING_MORE = "ACTIVATE_LOADING_MORE";
const LOADING_MORE_SUCCESSFUL = "LOADING_MORE_SUCCESSFUL";
const LOADING_MORE_UN_SUCCESSFUL = "LOADING_MORE_UN_SUCCESSFUL";
const UPDATE_ERRORS = "UPDATE_ERROR";
const DELETE_MOST_RECENT_ERROR = "DELETE_MOST_RECENT_ERROR";
const UPDATE_STORIES = "UPDATE_STORIES";
const UPDATE_LIKED = "UPDATE_LIKED";
const UPDATE_SAVED = "UPDATE_SAVED";

// helperFunctions

// reducer
const postsReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_DATA:
      return {
        ...state,
        posts: mapArrayWithUpdate(
          state.posts,
          payload.listIndex,
          payload.newNestedData
        ),
      };
    case UPDATE_ERRORS:
      return {
        ...state,
        errors: state.errors.concat(payload.error),
      };
    case ACTIVATE_REFRESHING:
      return {
        ...state,
        refreshing: mapArrayWithUpdate(
          state.refreshing,
          payload.listIndex,
          true
        ),
      };
    case REFRESHING_SUCCESSFUL:
      return {
        ...state,
        refreshing: mapArrayWithUpdate(
          state.refreshing,
          payload.listIndex,
          false
        ),
        posts: mapArrayWithUpdate(
          state.posts,
          payload.listIndex,
          payload.newNestedData
        ),
      };
    case REFRESHING_UN_SUCCESSFUL:
      return {
        ...state,
        refreshing: mapArrayWithUpdate(
          state.refreshing,
          payload.listIndex,
          false
        ),
        errors: state.errors.concat(payload.error),
      };
    case ACTIVATE_LOADING_MORE:
      return {
        ...state,
        loadingMore: mapArrayWithUpdate(
          state.loadingMore,
          payload.listIndex,
          true
        ),
      };
    case LOADING_MORE_SUCCESSFUL:
      return {
        ...state,
        loadingMore: mapArrayWithUpdate(
          state.loadingMore,
          payload.listIndex,
          false
        ),
        posts: state.posts.map((posts, index) =>
          index === payload.listIndex
            ? posts.concat(payload.newNestedData)
            : posts
        ),
      };
    case LOADING_MORE_UN_SUCCESSFUL:
      return {
        ...state,
        loadingMore: mapArrayWithUpdate(
          state.loadingMore,
          payload.listIndex,
          false
        ),
        errors: state.errors.concat(payload.error),
      };
    case DELETE_MOST_RECENT_ERROR:
      return {
        ...state,
        errors: state.errors.slice(1),
      };
    case UPDATE_STORIES:
      return {
        ...state,
        stories: payload,
      };
    case UPDATE_LIKED:
      return {
        ...state,
        posts: state.posts.map((nestedPostList, nestedListIndex) =>
          nestedListIndex === payload.listIndex
            ? nestedPostList.map((item, itemIndex) =>
                itemIndex === payload.index
                  ? { ...item, liked: !item.liked }
                  : item
              )
            : nestedPostList
        ),
      };
    case UPDATE_SAVED:
      return {
        ...state,
        posts: state.posts.map((nestedPostList, nestedListIndex) =>
          nestedListIndex === payload.listIndex
            ? nestedPostList.map((item, itemIndex) =>
                itemIndex === payload.index
                  ? { ...item, saved: !item.saved }
                  : item
              )
            : nestedPostList
        ),
      };
    default:
      throw new Error("invalid action");
  }
};

function useProfilePosts(nestedPostListCount) {
  const initialState = {
    posts: new Array(nestedPostListCount).fill([]),
    stories: [],
    refreshing: new Array(nestedPostListCount).fill(false),
    loadingMore: new Array(nestedPostListCount).fill(false),
    errors: [],
  };

  // state & dispatch
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const { posts, loadingMore, refreshing, errors, stories } = state;
  const userPosts = posts[0];
  const taggedPosts = posts[1];

  // helperFunctions
  const getPostsCount = useCallback((listIndex, postData, loadingMorePost) => {
    return Math.min(
      POSTS_BATCH_COUNT,
      postsMaxCount[listIndex] -
        (loadingMorePost ? postData[listIndex].length : 0)
    );
  }, []);
  const updateErrors = useCallback((error) => {
    dispatch({
      type: UPDATE_ERRORS,
      payload: { error },
    });
  }, []);
  const updatePersistedDataAsync = useCallback((key, presistedData) => {
    const jsonData = JSON.stringify(presistedData);
    return AsyncStorage.setItem(key, jsonData);
  }, []);
  const fetchPersistedDataAsync = useCallback(async (key) => {
    const persistedJSON = await AsyncStorage.getItem(key);
    if (persistedJSON != null) {
      return JSON.parse(persistedJSON);
    }
    throw new Error();
  }, []);
  const updatePersistedUserPosts = useCallback(
    async (newUserPosts) => {
      try {
        await updatePersistedDataAsync(USER_POSTS, newUserPosts);
      } catch ({ message }) {
        updateErrors(message);
      }
    },
    [updatePersistedDataAsync, updateErrors]
  );
  const fetchPersistedUserPostsAsync = useCallback(async () => {
    const newUserPosts = await fetchPersistedDataAsync(USER_POSTS);
    if (newUserPosts.length > 0) {
      return newUserPosts;
    }
    throw new Error();
  }, [fetchPersistedDataAsync]);
  const updatePersistedTaggedPosts = useCallback(
    async (newTaggedPosts) => {
      try {
        await updatePersistedDataAsync(TAGGED_POSTS, newTaggedPosts);
      } catch ({ message }) {
        updateErrors(message);
      }
    },
    [updatePersistedDataAsync, updateErrors]
  );
  const fetchPersistedTaggedPostsAsync = useCallback(async () => {
    const newTaggedPosts = await fetchPersistedDataAsync(TAGGED_POSTS);
    if (newTaggedPosts.length > 0) {
      return newTaggedPosts;
    }
    throw new Error();
  }, [fetchPersistedDataAsync]);
  const fetchPersistendStoriesAsync = useCallback(async () => {
    const newStories = await fetchPersistedDataAsync(STORIES);
    if (newStories.length > 0) {
      return newStories;
    }
    throw new Error();
  }, [fetchPersistedDataAsync]);
  const updatePersistendStories = useCallback(
    async (newStories) => {
      try {
        await updatePersistedDataAsync(STORIES, newStories);
      } catch ({ message }) {
        updateErrors(message);
      }
    },
    [updatePersistedDataAsync, updateErrors]
  );
  const generatePicturesAsync = useCallback(async (count) => {
    const rawPosts = await fetchRandomPhotosAsync(count);
    return rawPosts.map((postObj) => ({
      urls: postObj.urls,
      liked: false,
      saved: false,
    }));
  }, []);
  const fetchUserPostsOnMount = useCallback(async () => {
    let newUserPosts;
    try {
      newUserPosts = await fetchPersistedUserPostsAsync();
    } catch {
      try {
        newUserPosts = await generatePicturesAsync(getPostsCount(0));
      } catch ({ message }) {
        updateErrors(message);
      }
    }
    if (newUserPosts) {
      dispatch({
        type: UPDATE_DATA,
        payload: {
          listIndex: 0,
          newNestedData: newUserPosts,
        },
      });
    }
  }, [
    fetchPersistedUserPostsAsync,
    generatePicturesAsync,
    updateErrors,
    getPostsCount,
  ]);
  const fetchTaggedPostsOnMount = useCallback(async () => {
    let newTaggedPosts;
    try {
      newTaggedPosts = await fetchPersistedTaggedPostsAsync();
    } catch {
      try {
        newTaggedPosts = await generatePicturesAsync(getPostsCount(1));
      } catch ({ message }) {
        updateErrors(message);
      }
    }
    if (newTaggedPosts) {
      dispatch({
        type: UPDATE_DATA,
        payload: {
          listIndex: 1,
          newNestedData: newTaggedPosts,
        },
      });
    }
  }, [
    fetchPersistedTaggedPostsAsync,
    generatePicturesAsync,
    updateErrors,
    getPostsCount,
  ]);
  const fetchStoriesOnMount = useCallback(async () => {
    let newStories;
    try {
      newStories = await fetchPersistendStoriesAsync();
    } catch {
      try {
        const rawStories = await fetchRandomPhotosAsync(10);
        newStories = rawStories.map((story) => story.urls);
      } catch ({ message }) {
        updateErrors(message);
      }
    }
    if (newStories) {
      dispatch({
        type: UPDATE_STORIES,
        payload: newStories,
      });
    }
  }, [fetchPersistendStoriesAsync, updateErrors]);
  const onListMount = useCallback(() => {
    fetchUserPostsOnMount();
    fetchTaggedPostsOnMount();
    fetchStoriesOnMount();
  }, [fetchUserPostsOnMount, fetchTaggedPostsOnMount, fetchStoriesOnMount]);
  const onRefresh = useCallback(
    async (listIndex) => {
      dispatch({
        type: ACTIVATE_REFRESHING,
        payload: { listIndex },
      });
      try {
        const newNestedData = await generatePicturesAsync(
          getPostsCount(listIndex)
        );
        dispatch({
          type: REFRESHING_SUCCESSFUL,
          payload: {
            listIndex,
            newNestedData,
          },
        });
      } catch ({ message }) {
        dispatch({
          type: REFRESHING_UN_SUCCESSFUL,
          payload: {
            listIndex,
            error: message,
          },
        });
      }
    },
    [getPostsCount, generatePicturesAsync]
  );
  const onEndReached = useCallback(
    async (listIndex) => {
      // continue here DEBUG not calling
      if (!loadingMore[listIndex]) {
        if (posts[listIndex].length < postsMaxCount[listIndex]) {
          dispatch({
            type: ACTIVATE_LOADING_MORE,
            payload: { listIndex },
          });
          try {
            const newNestedData = await generatePicturesAsync(
              getPostsCount(listIndex, posts, true)
            );
            setTimeout(() => {
              dispatch({
                type: LOADING_MORE_SUCCESSFUL,
                payload: {
                  newNestedData,
                  listIndex,
                },
              });
            }, 3000);
          } catch ({ message }) {
            dispatch({
              type: LOADING_MORE_UN_SUCCESSFUL,
              payload: {
                error: message,
                listIndex,
              },
            });
          }
        }
      }
    },
    [loadingMore, posts, getPostsCount, generatePicturesAsync]
  );
  const deleteMostRecentError = useCallback(() => {
    dispatch({
      type: DELETE_MOST_RECENT_ERROR,
    });
  }, []);
  const updateLiked = useCallback((index, listIndex) => {
    dispatch({
      type: UPDATE_LIKED,
      payload: { index, listIndex },
    });
  }, []);
  const updateSaved = useCallback((index, listIndex) => {
    dispatch({
      type: UPDATE_SAVED,
      payload: { index, listIndex },
    });
  }, []);

  // effects
  // set list posts
  useEffect(() => {
    onListMount();
  }, [onListMount]);
  // update persisted posts
  useEffect(() => {
    updatePersistedUserPosts(userPosts);
  }, [userPosts, updatePersistedUserPosts]);
  useEffect(() => {
    updatePersistedTaggedPosts(taggedPosts);
  }, [taggedPosts, updatePersistedTaggedPosts]);
  useEffect(() => {
    updatePersistendStories(stories);
  }, [stories, updatePersistendStories]);

  // useEffect(() => {
  //   const timer = setTimeout(
  //     () =>
  //       updateErrors([
  //         "Network request failed",
  //         "OAuth error: The access token is invalid",
  //         "http://192.168.0.1/index.html",
  //       ]),
  //     10000
  //   );
  //   return () => clearTimeout(timer);
  // }, []);

  return {
    posts,
    stories,
    refreshing,
    loadingMore,
    errors,
    onRefresh,
    onEndReached,
    deleteMostRecentError,
    updateLiked,
    updateSaved,
  };
}

export default useProfilePosts;
