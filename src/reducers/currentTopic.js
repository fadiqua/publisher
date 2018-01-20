// npm packages
import { createReducer } from 'redux-act';
// project files
import * as actions from '../actions/actionTypes';

export const initialState = {
    loading: false,
    error: false,
    sortBy: 'date',
    limit: 0,
    page: 1,
    docs: [],

};

const currentTopicReducer = createReducer({
    [actions.fetchCurrentTopic]: (state) => ({ ...state, loading: true, error: false}),
    [actions.fetchCurrentTopicSuccess]: (state, payload) => ({ loading: false, ...payload }),
    [actions.fetchCurrentTopicFailed]: (state, payload) => ({
        ...initialState.currentTopic,
        error: true
    })
}, initialState);

export default currentTopicReducer;