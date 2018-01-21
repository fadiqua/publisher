// npm packages
import { createReducer } from 'redux-act';
// project files
import * as actions from '../actions/actionTypes';
import { arrayToMap, addItem, deleteItem, duplicate, addMultipleItems } from '../utils/functions';

export const initialState = {
    docs: new Map(),
    page: 1,
    pages: 0,
    responseStatus: null,
    loadingReplies: null,
    selectedResponse: {
        response: {},
        docs: new Map(),
        page: 1,
        pages: 0,
    }

}

const responsesReducer = createReducer({
    [actions.createResponse]: (state) => ({ ...state, responseStatus: 'create'}),
    [actions.createResponseSuccess]: (state, payload) => ({
        ...state, responseStatus: 'created',
        docs: addItem(state.docs, payload)}),
    [actions.fetchResponses]: (state) => ({...state, responseStatus: 'fetch',}),
    [actions.fetchResponsesSuccess]: (state, payload) => ({
            ...state, ...payload, responseStatus: null,
            docs: addMultipleItems(state.docs, arrayToMap(payload.docs)),
        }),
    [actions.deleteResponse]: (state, payload) => ({ ...state,
        docs: deleteItem(state.docs, payload)}),
    [actions.addResponse]: (state, payload) => ({ ...state, docs: addItem(state.docs, payload)}),
    [actions.clearResponseStatus]: (state) => ({ ...state, responseStatus: null, loadingReplies:null }),
    [actions.likeComment]: (state, payload) => {
        const { user, isLiked, id } = payload;
        return {
            ...state,
            docs: responseLike(state.docs,id,user, isLiked)
        }
    },
    [actions.fetchReplies]: (state, payload) => ({
        ...state,
        loadingReplies: payload.type

    }),
    // Replies actions
    [actions.selectedResponseForReply]: (state, payload) => ({
        ...state,
        loadingReplies: null,
        selectedResponse: {
            ...state.selectedResponse,
            response: payload,
        }

    }),
    [actions.fetchRepliesSuccess]: (state, payload) => ({
        ...state,
        loadingReplies: null,
        selectedResponse: {
            ...state.selectedResponse, ...payload,
            docs: addMultipleItems(state.selectedResponse.docs,arrayToMap(payload.docs))
        }
    }),
    [actions.fetchRepliesFailed]: (state) => ({
        ...state,
        loadingReplies: 'error',
    }),
    [actions.createReply]: (state) => ({
        ...state,
        loadingReplies: 'creating',
    }),
    [actions.createReplySuccess]: (state, payload) => ({
        ...state,
        docs: repliesCount(state.docs, state.selectedResponse.response._id, 1),
        loadingReplies: 'created',
        selectedResponse: {
            ...state.selectedResponse,
            docs: addItem(state.selectedResponse.docs,payload)
        }
    }),
    [actions.deleteReply]: (state, payload) => ({
        ...state,
        docs: repliesCount(state.docs, state.selectedResponse.response._id, -1),
        selectedResponse: {
            ...state.selectedResponse,
            docs: deleteItem(state.selectedResponse.docs,payload)
        }
    }),
    [actions.resetReplies]: (state) => ({
        ...state,
        selectedResponse: initialState.responses.selectedResponse
    }),
    [actions.initResponses]: (state) => initialState
}, initialState);

function responseLike(state, id, user, isLiked) {
    const newMap = duplicate(state);
    const response = newMap.get(id);
    if(response) {
        if(!isLiked){
            response._likes = response._likes.filter(id => id !== user);
            --response.likesCount;
        } else {
            response._likes = [...response._likes, user];
            ++response.likesCount
        }
        newMap.set(response._id, response);
        return newMap;
    }
    return state;
}
function repliesCount(state, id, v) {
    const newMap = duplicate(state);
    let response = newMap.get(id);
    response.repliesCount = response.repliesCount + v;
    if(response.repliesCount < 0){
        response.repliesCount = 0;
    }
    newMap.set(response._id, response);
    return newMap
}
export default responsesReducer;