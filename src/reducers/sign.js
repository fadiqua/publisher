import { createReducer } from 'redux-act';

import initialState from './initialState';
import * as actions from '../actions/actionTypes';

const signReducer = createReducer({
    [actions.toggleSignin]: (state) => ({
        ...state, siginVisible: !state.siginVisible,
        signupVisible:false,
        loading: false
    }),
    [actions.toggleSignup]: (state) => ({
        ...state, siginVisible: false,
        signupVisible:!state.signupVisible,
        loading: false
    }),
    [actions.signinRequest]: (state) => ({ ...state, loading:true })
}, initialState.sign);

export default signReducer;
