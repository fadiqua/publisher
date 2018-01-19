import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import axios from 'axios';

import * as actions from '../actions/actionTypes';

export function* fetchTopicsAsync() {
    try {
        const response = yield call(axios.get, '/api/topics');
        yield put({type: actions.fetchTopicsSuccess, payload: response.data.topics})
    } catch (e) {
        console.log(e)
    }
}

export function* watchFetchTopics() {
    yield takeEvery(actions.fetchTopics, fetchTopicsAsync)
}
