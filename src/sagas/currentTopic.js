import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios';

import * as actions from '../actions/actionTypes';

export function* fetchCurrentTopicStoriesAsync(action) {
    try {
        const response = yield call(axios.get, `/api/topic/stories/${action.payload.query}`, {
            params:{
                topic: action.payload.topic
            }
        });
        yield put({type: actions.fetchCurrentTopicSuccess, payload: response.data.stories });
        // yield put({type: actions.clearCreatedStory});
    } catch (e) {
        yield put({type: actions.fetchCurrentTopicFailed, payload: e})
    }
}

export function* watchFetchCurrentTopicStories() {
    yield takeEvery(actions.fetchCurrentTopic, fetchCurrentTopicStoriesAsync)
}