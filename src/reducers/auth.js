// npm packages
import { createReducer } from 'redux-act';
// project files
import * as actions from '../actions/actionTypes';

export const initialState = {
  loading: true,
  isAuthenticated: false,
  currentUser: {
    _id: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    displayName: null,
    picture: null,
    permission: null,
    thumbnail: null,
    draft: null,
  },
};

export function followUser(currentUser, userId, type = '_following') {
  const user = {
    ...currentUser,
  };
  const temp = user[type].find(id => id === userId);
  if (temp) {
    user[type] = [...user[type].filter(id => id !== userId)];
  } else {
    user[type] = [
      ...user[type],
      userId,
    ];
  }
  return user;
}

const authReducer = createReducer({
  [actions.fetchUserFromSocial]: state => ({ ...state, loading: true }),
  [actions.autoLogin]: state => ({ ...state, loading: true }),
  [actions.loginFailed]: state => ({ ...state, loading: false }),
  [actions.fetchUserSuccess]: (state, payload) => ({
    isAuthenticated: true,
    loading: false,
    currentUser: payload,
  }),
  [actions.updateProfile]: (state, payload) => ({
    ...state,
    currentUser: { ...state.currentUser, ...payload },
  }),
  [actions.followUserSuccess]: (state, payload) => {
    if (state.isAuthenticated) {
      const currentUser = followUser(state.currentUser, payload);
      return {
        ...state,
        currentUser,
      };
    }
    return state;
  },
}, initialState); // <-- This is the default state

export default authReducer;
