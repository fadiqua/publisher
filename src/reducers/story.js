import { createReducer } from 'redux-act';

import * as actions from '../actions/actionTypes';

export const initialState =  {
    mode: 'create',
    loading: false,
    responseStatus: null,
    showResponses: false,
    currentStory: {
        isOwner: false,
        _creator: {},
        _comments: [],
        _likes:[]
    }
};

const storyReducer = createReducer({
    [actions.fetchStory]: (state) => ({...state, loading: true}),
    [actions.fetchStorySuccess]: (state, payload) => ({
        ...state, loading: false, currentStory: payload
    }),
    [actions.clearCreatedStory]: (state) => initialState.story,
    [actions.createResponseSuccess]: (state, payload) => ({...state,
        currentStory: {...state.currentStory, commentsCount: state.currentStory.commentsCount + 1 }}),
    [actions.deleteResponse]: (state, payload) =>  ({...state,
        currentStory: {...state.currentStory, commentsCount: state.currentStory.commentsCount - 1 }}),
    [actions.likeStory]: (state, payload) =>({...state,
            currentStory: storyLike(state.currentStory, payload.user)}),
    [actions.likeStoryRes]: (state, payload) => {
        const { currentStory } = state;
        const { isLiked, user, error } = payload;
        const story = isLiked === currentStory.isUserLiked && !error ?
            currentStory : storyLike(currentStory, user);
        return {
            ...state,
            currentStory: story
        }
    },
}, initialState);

function storyLike(state, payload) {
    const isLiked = !state.isUserLiked;
    const _likes = !isLiked?
        state._likes.filter(id => id !== payload):[...state._likes, payload];
    return {
        ...state,
        likesCount:  !isLiked ? state.likesCount - 1:  state.likesCount + 1,
        _likes,
        isUserLiked: isLiked
    }
}

export default storyReducer;
