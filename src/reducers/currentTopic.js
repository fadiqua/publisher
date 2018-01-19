import { createReducer } from 'redux-act';

import initialState from './initialState';
import * as actions from '../actions/actionTypes';

const currentTopicReducer = createReducer({
    [actions.fetchCurrentTopic]: (state) => ({ ...state, loading: true, error: false}),
    [actions.fetchCurrentTopicSuccess]: (state, payload) => ({ loading: false, ...payload }),
    [actions.fetchCurrentTopicFailed]: (state, payload) => ({
        ...initialState.currentTopic,
        error: true
    })
}, initialState.currentTopic);

export default currentTopicReducer;