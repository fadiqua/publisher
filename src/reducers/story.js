import { createReducer } from 'redux-act';

import initialState from './initialState';
import * as actions from '../actions/actionTypes';

const storyReducer = createReducer({
    [actions.createStory]: (state) => ({...state, loading: true}),
    [actions.createStorySuccess]: (state, payload) => ({...state, loading: false, created: true,
        createdStory: payload}),
    [actions.createStoryFailed]: (state) => ({...state, loading: false, createdStory: undefined}),
    [actions.fetchStory]: (state) => ({...state, loading: true}),
    [actions.fetchStorySuccess]: (state, payload) => ({...state, loading: false, currentStory: payload}),
    [actions.clearCreatedStory]: (state) => initialState.story,
    [actions.createResponseSuccess]: (state, payload) => ({...state,
        currentStory: {...state.currentStory, commentsCount: state.currentStory.commentsCount + 1 }}),
    [actions.deleteResponse]: (state, payload) =>  ({...state,
        currentStory: {...state.currentStory, commentsCount: state.currentStory.commentsCount - 1 }}),
    [actions.likeStory]: (state, payload) =>({...state,
            currentStory: storyLike(state.currentStory, payload.user, payload.isLiked)}),
}, initialState.story);

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
