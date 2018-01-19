import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios';

import * as actions from '../actions/actionTypes';

export function* fetchProfileAsync(action) {
    const { payload } = action;
    try {
        const response = yield call(axios.get, `/api/user/${payload}`);
        yield put({type: actions.fetchProfileSuccess, payload: response.data.user})
    } catch (e) {
        yield put({type: actions.fetchProfileError})
    }
}

export function* watchFetchProfile() {
    yield takeEvery(actions.fetchProfile, fetchProfileAsync)
}
// ----------------------------------------------------------------------------------------

export function* fetchProfileStoriesAsync (action) {
    const { username, type, page } = action.payload;
    try {
        const response = yield call(axios.get, `/api/user/${username}/stories`, {
            params: {
                page
            }
        });
        yield put({ type: actions.fetchProfileStoriesSuccess, payload: {
            data:  response.data, type: type || null }})
    } catch (e) {

    }
}

export function* watchFetchProfileStories() {
    yield takeEvery(actions.fetchProfileStories, fetchProfileStoriesAsync)
}
// ----------------------------------------------------------------------------------------

export function* fetchProfileResponsesAsync (action) {
    const { username, type, page } = action.payload;
    try {
        const response = yield call(axios.get, `/api/comment/${username}/stories`, {
            params: {
                page
            }
        });
        yield put({ type: actions.fetchResponsesSuccess, payload: response.data})
    } catch (e) {

    }
}

export function* watchFetchProfileResponses() {
    yield takeEvery(actions.fetchProfileResponses, fetchProfileResponsesAsync)
}