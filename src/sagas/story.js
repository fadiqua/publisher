import { put, call, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios';

import * as actions from '../actions/actionTypes';

export function* createStoryAsync(action) {
    try {
        const response = yield call(axios.post, '/api/story', {
            ...action.payload
        });
        yield put({type: actions.createStorySuccess, payload: response.data.story});
        yield put({type: actions.clearCreatedStory});
    } catch (e) {
        console.log('error', e)
    }
}

export function* watchCreateStory() {
    yield takeEvery(actions.createStory, createStoryAsync)
}

// ---------------------------------------------------------------------------

export function* fetchStoryAsync(action) {
    try {
        const response = yield call(axios.get, `/api/story/${action.payload.slug}`);
        yield put({type: actions.fetchStorySuccess, payload: response.data.story});
    } catch (e) {

    } finally {

    }
}

export function* watchFetchStory() {
    yield takeEvery(actions.fetchStory, fetchStoryAsync)
}

// -------------------------------------------------------------------

export function* createResponseAsync(action) {
    try {
        const response = yield call(axios.post, `/api/comment`, {
            ...action.payload
        });
        yield put({type: actions.createResponseSuccess, payload: response.data.comment});
        yield put({type: actions.clearResponseStatus})
    } catch (e) {

    }
}

export function* watchCreateResponse() {
    yield takeEvery(actions.createResponse, createResponseAsync)
}
// -------------------------------------------------------------------

export function* fetchResponsesAsync(action) {
    const {page, id} = action.payload;
    try {
        const response = yield call(axios.get, `/api/comment/${id}`, {
            params: {
                page: page || 1
            }
        });
        yield put({type: actions.fetchResponsesSuccess, payload: response.data});
        // yield put({type: actions.clearResponseStatus})
    } catch (e) {
    }
}

export function* watchFetchResponses() {
    yield takeEvery(actions.fetchResponses, fetchResponsesAsync)
}

// --------------------------------------------------------------------------

export function* fetchRepliesAsync(action) {
    const { id, type, page } = action.payload;

    try {
        let api = [];
        let dispatchedActions = [];
        if(type === 'initial') {
            api.push( call(axios.get, `/api/comment/${id}/response`));
            api.push(call(axios.get, `/api/comment/${id}/replies`));
        } else {
            api.push(call(axios.get, `/api/comment/${id}/replies`,{
                params: { page: page || 1}
            }));
        }
        const response = yield all(api);
        if(type === 'initial') {
            dispatchedActions.push(put({type: actions.addResponse, payload: response[0].data.response}));
            dispatchedActions.push(put({type: actions.selectedResponseForReply, payload: response[0].data.response}),)
            dispatchedActions.push(put({type: actions.fetchRepliesSuccess, payload: response[1].data}))
        } else {
            dispatchedActions.push(put({type: actions.fetchRepliesSuccess, payload: response[0].data}))
        }
        yield all(dispatchedActions);
    } catch (e) {
        yield put({ type: actions.fetchRepliesFailed, payload: e.message});
        // yield put({ type: actions.clearResponseStatus})
    }
}

export function* watchFetchReplies() {
    yield takeEvery(actions.fetchReplies, fetchRepliesAsync)
}
// -------------------------------------------------------------------

export function* createReplyAsync(action) {
    try {
        const response = yield call(axios.post, `/api/comment`, {
            ...action.payload
        });
        yield put({type: actions.createReplySuccess, payload: response.data.comment});
        yield put({type: actions.clearResponseStatus})
    } catch (e) {

    }
}

export function* watchCreateReply() {
    yield takeEvery(actions.createReply, createReplyAsync)
}