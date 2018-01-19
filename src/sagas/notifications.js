import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
    markNotificationAsRead,
    markNotificationAsReadSuccess, fetchNotifications,
    fetchNotificationsSuccess
} from '../actions/actionTypes'

export function* markNotificationAsReadAsync(action) {
    try {
        const id = action.payload;
        yield call(axios.post,`/api/notifications`, {id});
        yield put(markNotificationAsReadSuccess(id))
    } catch (error) { }
}

export function* watchMarkNotificationAsRead () {
    yield takeEvery(markNotificationAsRead, markNotificationAsReadAsync)
}

// -----------------------------------------------------------------------
function* fetchNotificationsAsync (action ) {
    try {
        const page = action.payload.page;
        const response = yield call(axios.get, '/api/notifications', { params: { page } });
        yield put(fetchNotificationsSuccess(response.data))
    } catch (e) {

    }
}

export function* watchFetchNotifications () {
    yield takeEvery(fetchNotifications, fetchNotificationsAsync);
}
