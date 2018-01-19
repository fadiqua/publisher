// npm packages
import { takeEvery } from 'redux-saga';
import { fork, take, call, put, cancel, all } from 'redux-saga/effects';
import axios from 'axios';
import openSocket from 'socket.io-client';
// project files
import * as actions from '../actions/actionTypes';
import { saveToken, clearToken } from '../config/axios.config';
import { subscribe } from './channels';
import {
    socialLogin, followUser,
    getUnreadNotifCount
} from '../routes';
import { SOCKET_URL } from '../utils/constants';

function connect() {
    const socket = openSocket(SOCKET_URL);
    return new Promise(resolve => {
        socket.on('connect', () => {
            // console.log('connected to socket.io port=3092')
            resolve(socket);
        });
    });
}

export function* authorize (action) {
    try {
        const { network, socialToken, data } = action.payload;
        let response =  yield call(socialLogin, {
            network, socialToken, data
        });

        yield put({type: actions.fetchUserSuccess, payload: response.data.currentUser});
        return {
            token:response.data.token,
            id: response.data.currentUser._id
        };
    } catch (e) {
    }
}

export function* getUnreadNotificationsCount () {
    try {
        const response = yield call(getUnreadNotifCount)
        yield put({
            type: actions.getUnReadInitialNotificationsCount,
            payload:response.data.count
        })
    } catch (e) {
    }
}

// -------------------------------------------------------------------
export function* followUserAsync(action) {
    try {
        yield call(axios.post, '/api/follow', { id: action.payload });
        yield call(followUser, action.payload);
        yield put({type: actions.followUserSuccess, payload: action.payload});
    } catch (e) {
    }
}

export function* watchFollowUser() {
    yield takeEvery(actions.followUser, followUserAsync)
}

function* read(socket, id) {
    const channel = yield call(subscribe, socket, id);
    while (true) {
        let action = yield take(channel);
        yield put(action);
    }
}

function* write(socket) {
    while (true) {
        const { payload } = yield take(`${actions.sendMessage}`);
        socket.emit('message', payload);
    }
}

export function* autoLoginFlow() {
    while (true) {
        try {
            const loginAction = yield take(`${actions.autoLogin}`);
            if(loginAction.payload.token) {
                yield call(saveToken, loginAction.payload.token);
            }
            const res =  yield all([
                put({type: actions.fetchUserSuccess, payload: loginAction.payload}),
                call(connect)
            ]);
            const socket = res[1];
            const task = yield fork(handleIO, socket, loginAction.payload.id);
            yield call(getUnreadNotificationsCount);
            yield take(`${actions.logout}`);
            yield cancel(task);
            yield call(clearToken)
        }
        catch (e){
            yield put({type: 'LOGIN_ERROR', error: e.message})
        }
    }

}

export function* loginFlowFromSocial() {
    while (true) {
        try {
            const loginAction = yield take(`${actions.fetchUserFromSocial}`);
            const user = yield call(authorize,loginAction);
            if(user.token) {
                yield call(saveToken, user.token);
                const socket = yield call(connect);
                // socket.emit('login', { username: payload.username });
                const task = yield fork(handleIO, socket, user.id);
                yield call(getUnreadNotificationsCount);
                yield take(`${actions.logout}`);
                yield cancel(task);
                socket.emit('logout');
                yield call(clearToken)
            }

        } catch (error) {
            yield put({type: 'LOGIN_ERROR', error });
            yield call(clearToken)
        }
    }
}

function* handleIO(socket, id) {
    yield fork(read, socket, id);
    yield fork(write, socket);
}
