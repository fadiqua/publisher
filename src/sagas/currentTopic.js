// npm packages
import { put, call, takeEvery } from 'redux-saga/effects'
// project files
import { getCurrentTopicStories } from '../routes'
import * as actions from '../actions/actionTypes';

export function* fetchCurrentTopicStoriesAsync(action) {
    try {
        const { query, topic } =  action.payload;
        const response = yield call(getCurrentTopicStories, query, {topic});
        yield put({ type: actions.fetchCurrentTopicSuccess, payload: response.data.stories });
        // yield put({type: actions.clearCreatedStory});
    } catch (e) {
        yield put({ type: actions.fetchCurrentTopicFailed, payload: e.response.data })
    }
}

export function* watchFetchCurrentTopicStories() {
    yield takeEvery(actions.fetchCurrentTopic, fetchCurrentTopicStoriesAsync)
}