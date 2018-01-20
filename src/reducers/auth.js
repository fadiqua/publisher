import { createReducer } from 'redux-act';

import * as actions from '../actions/actionTypes';
import initialState from './initialState';

const authReducer = createReducer({
    [actions.fetchUserFromSocial]: (state) => ({ ...state, loading: true }),
    [actions.autoLogin]: (state) => ({ ...state, loading: true }),
    [actions.loginFailed]: (state) => ({ ...state, loading: false }),
    [actions.fetchUserSuccess]: (state, payload) => {
        return {
            isAuthenticated:true,
            loading: false,
            currentUser: payload
        }
    },
    [actions.updateProfile]: (state, payload) => ({ ...state,
        currentUser: { ...state.currentUser, ...payload }}),
    [actions.followUserSuccess]: (state, payload) => {
        if(state.isAuthenticated){
            const currentUser = followUser(state.currentUser, payload);
            return {
                ...state,
                currentUser
            };
        }
        return state;
    }
}, initialState.auth); // <-- This is the default state


export function followUser(currentUser, userId, type='_following') {
    const user = {
        ...currentUser
    };
    let temp = user[type].find(id => id === userId);
    if(temp){
        user[type] = [...user[type].filter(id => id !== userId )];
    } else {
        user[type] = [
            ...user[type],
            userId
        ]
    }
    return user
}
export default authReducer;