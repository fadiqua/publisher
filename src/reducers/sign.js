import { createReducer } from 'redux-act';

import * as actions from '../actions/actionTypes';

export const initialState = {
  siginVisible: false,
  signupvisible: false,
  loading: false,
};

const signReducer = createReducer({
  [actions.toggleSignin]: state => ({
    ...state,
    siginVisible: !state.siginVisible,
    signupVisible: false,
    loading: false,
  }),
  [actions.toggleSignup]: state => ({
    ...state,
    siginVisible: false,
    signupVisible: !state.signupVisible,
    loading: false,
  }),
  [actions.signinRequest]: state => ({ ...state, loading: true }),
}, initialState);

export default signReducer;
