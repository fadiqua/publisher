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
    // [actions.likeStory]: (state, payload) =>({...state,
    //         currentStory: storyLike(state.currentStory, payload.user, payload.isLiked)}),
}, initialState);

function storyLike(state, payload, isLiked) {
    const _likes = !isLiked?
        state._likes.filter(id => id !== payload):[...state._likes, payload];
    return {
        ...state,
        likesCount:  !isLiked ? state.likesCount - 1:  state.likesCount + 1,
        _likes
    }
}

export default storyReducer;
