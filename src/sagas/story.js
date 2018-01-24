// npm packages
import { put, call, takeEvery, all } from 'redux-saga/effects'
// project files
import {
    createStory,
    getStory,
    createResponse,
    getResponses,
    getResponseById,
    getReplies,
    createReply,
    like
} from '../routes';
import * as actions from '../actions/actionTypes';

// ---------------------------------------------------------------------------
export function* fetchStoryAsync(action) {
    try {
        const response = yield call(getStory, action.payload.slug);
        yield put({type: actions.fetchStorySuccess, payload: response.data.story});
    } catch (e) {
    } finally {

    }
}

export function* watchFetchStory() {
    yield takeEvery(actions.fetchStory, fetchStoryAsync)
}

// -------------------------------------------------------------------

export function* likeStoryAsync (action) {
    try {
        // const { id, type, parent } = action.payload;
        const response = yield like(action.payload)
        console.log('response ', response)
    } catch (err) {

    }
}

export function* watchLikeStory () {
    yield takeEvery(actions.likeStory, likeStoryAsync)
}

// -------------------------------------------------------------------
export function* createResponseAsync(action) {
    try {
        const response = yield call(createResponse, action.payload);
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
        const response = yield call(getResponses, id, page);
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
            api.push(call(getResponseById, id));
            api.push(call(getReplies, id));
        } else {
            api.push(call(getReplies, id, page));
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
        const response = yield call(createReply, action.payload);
        yield put({type: actions.createReplySuccess, payload: response.data.comment});
        yield put({type: actions.clearResponseStatus})
    } catch (e) {

    }
}

export function* watchCreateReply() {
    yield takeEvery(actions.createReply, createReplyAsync)
}