// npm packages
import { createReducer } from 'redux-act';
// project files
import * as actions from '../actions/actionTypes';

export const initialState =  {
    mobile: false,
    collapsed: false,
    siderSelected: 'home'
};

const screenSizeReducer = createReducer({
    [actions.siderCollapsed]: (state) => ({...state, collapsed: !state.collapsed}),
    [actions.isMobile]: (state, payload) => ({...state, mobile: payload, collapsed: false}),
    [actions.siderSelected]: (state, payload) => ({ ...state, siderSelected: payload, collapsed: false })
}, initialState);

export default screenSizeReducer;