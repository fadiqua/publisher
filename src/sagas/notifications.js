// npm packages
import { takeEvery, call, put } from 'redux-saga/effects';
// project files
import {
    markNotificationRead,
    getNotifications
} from '../routes';
import {
    markNotificationAsRead,
    markNotificationAsReadSuccess, fetchNotifications,
    fetchNotificationsSuccess
} from '../actions/actionTypes'

export function* markNotificationAsReadAsync(action) {
    try {
        const id = action.payload;
        yield call(markNotificationRead, id);
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
        const response = yield call(getNotifications, page);
        yield put(fetchNotificationsSuccess(response.data))
    } catch (e) {

    }
}

export function* watchFetchNotifications () {
    yield takeEvery(fetchNotifications, fetchNotificationsAsync);
}
