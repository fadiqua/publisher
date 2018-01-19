import { createReducer } from 'redux-act';

import initialState from './initialState';
import * as actions from '../actions/actionTypes';

const topicsReducer = createReducer({
    [actions.fetchTopics]: (state) => ({...state, loading: true}),
    [actions.fetchTopicsSuccess]: (state, payload) => ({...state, loading: false, items: payload}),
    [actions.fetchCategory]: (state) => ({...state, fetching: true}),
    [actions.siderFulfilled]: (state, payload) => ({...state, fetching: false, sider: payload}),
    [actions.topicsFulfilled]: (state, payload) => ({...state, topics: payload})
}, initialState.topics);

export default topicsReducer;