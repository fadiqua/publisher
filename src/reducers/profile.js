import { createReducer } from 'redux-act';

import initialState from './initialState';
import * as actions from '../actions/actionTypes';
import { followUser } from './auth'

const profileReducer = createReducer({
    [actions.fetchProfile]: (state) => ({ ...state, loading: 'fetchProfile'}),
    [actions.fetchProfileSuccess]: (state, payload) => ({
        ...state, loading: null, user: payload
    }),
    [actions.fetchProfileError]: (state) => ({
        ...state, loading: false, error: true
    }),
    [actions.updateProfile]: (state, payload) => ({
        ...state, user: payload
    }),
    [actions.fetchProfileStories]: (state) =>  ({ ...state, loading: 'fetchProfileStories'}),
    [actions.fetchProfileStoriesSuccess]: (state, payload) => {
        const data = payload.data;
        if(payload.type === 'paginate'){
            const docs = state.stories.docs;
           data.docs = [ ...docs, ...data.docs]
        }
        return {
            ...state, loading: null, stories: data
        }
    },
    [actions.followProfile]: (state, payload) => {
        const user = followUser(state.user, payload.id, payload.type);
        return { ...state, user }
    }
    // [actions.fetchProfileResponsesSuccess]: (state, payload) => ({
    //     ...state,
    //     responses: payload.data
    // })
},initialState.profile);

function followProfile(state, payload) {
    if(state._following.indexOf(payload) !== -1){
        state._following = state._following.filter(i => i ===payload)
    } else {
        state._following.push(payload)
    }
    return { ...state }
}

export default profileReducer;