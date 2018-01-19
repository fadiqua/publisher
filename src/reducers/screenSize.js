import { createReducer } from 'redux-act';

import initialState from './initialState';
import * as actions from '../actions/actionTypes';

const screenSizeReducer = createReducer({
    [actions.siderCollapsed]: (state) => ({...state, collapsed: !state.collapsed}),
    [actions.isDesktop]: (state) => ({...state, mobile:false, desktop: true, collapsed: false}),
    [actions.isMobile]: (state) => ({...state, mobile:true, desktop: false, collapsed: false}),
    [actions.siderSelected]: (state, payload) => ({ ...state, siderSelected: payload, collapsed: false })
}, initialState.screenSize);

export default screenSizeReducer;