// npm packages
import { put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
// project files
import {
  createResponse,
  getResponses,
  getResponseById,
  getReplies,
  createReply,
  like,
} from '../routes';
import * as actions from '../actions/actionTypes';


// -------------------------------------------------------------------
export function* createResponseAsync(action) {
  try {
    const response = yield call(createResponse, action.payload);
    yield put({ type: actions.createResponseSuccess, payload: response.data.comment });
    yield put({ type: actions.clearResponseStatus });
  } catch (e) {

  }
}

export function* watchCreateResponse() {
  yield takeEvery(actions.createResponse, createResponseAsync);
}
// -------------------------------------------------------------------

export function* fetchResponsesAsync(action) {
  const { page, id } = action.payload;
  try {
    const response = yield call(getResponses, id, page);
    yield put({ type: actions.fetchResponsesSuccess, payload: response.data });
    // yield put({type: actions.clearResponseStatus})
  } catch (e) {
  }
}

export function* watchFetchResponses() {
  yield takeEvery(actions.fetchResponses, fetchResponsesAsync);
}

// --------------------------------------------------------------------------

export function* fetchRepliesAsync(action) {
  const { id, type, page } = action.payload;

  try {
    const api = [];
    const dispatchedActions = [];
    if (type === 'initial') {
      api.push(call(getResponseById, id));
      api.push(call(getReplies, id));
    } else {
      api.push(call(getReplies, id, page));
    }
    const response = yield all(api);
    if (type === 'initial') {
      dispatchedActions.push(put({ type: actions.addResponse, payload: response[0].data.response }));
      dispatchedActions.push(put({ type: actions.selectedResponseForReply, payload: response[0].data.response }));
      dispatchedActions.push(put({ type: actions.fetchRepliesSuccess, payload: response[1].data }));
    } else {
      dispatchedActions.push(put({ type: actions.fetchRepliesSuccess, payload: response[0].data }));
    }
    yield all(dispatchedActions);
  } catch (e) {
    yield put({ type: actions.fetchRepliesFailed, payload: e.message });
    // yield put({ type: actions.clearResponseStatus})
  }
}

export function* watchFetchReplies() {
  yield takeEvery(actions.fetchReplies, fetchRepliesAsync);
}

// -------------------------------------------------------------------
export function* createReplyAsync(action) {
  try {
    const response = yield call(createReply, action.payload);
    yield put({ type: actions.createReplySuccess, payload: response.data.comment });
    yield put({ type: actions.clearResponseStatus });
  } catch (e) {

  }
}

export function* watchCreateReply() {
  yield takeEvery(actions.createReply, createReplyAsync);
}

// -------------------------------------------------------------------
export function* likeResponseAsync(action) {
  try {
    // const { id, type, parent } = action.payload;
    const response = yield like(action.payload);
    yield put({ type: actions.likeResponseRes, payload: response.data });
  } catch (err) {
    yield put({ type: actions.likeResponseRes, payload: { error: true, id: action.payload.id } });
  }
}

export function* watchLikeResponse() {
  yield takeEvery(actions.likeResponse, likeResponseAsync);
}
