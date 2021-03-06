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
  },

};

function responseLike(state, id) {
  const newMap = duplicate(state);
  const response = newMap.get(id);
  if (!response) return state;
  const isLiked = response.isLiked;
  response.isLiked = !isLiked;
  response.likesCount = isLiked ? response.likesCount - 1 : response.likesCount + 1;
  newMap.set(response._id, response);
  return newMap;

  // if(response) {
  //     if(!isLiked){
  //         response._likes = response._likes.filter(id => id !== user);
  //         --response.likesCount;
  //     } else {
  //         response._likes = [...response._likes, user];
  //         ++response.likesCount
  //     }
  //     newMap.set(response._id, response);
  //     return newMap;
  // }
  // return state;
}
function repliesCount(state, id, v) {
  const newMap = duplicate(state);
  const response = newMap.get(id);
  response.repliesCount += v;
  if (response.repliesCount < 0) {
    response.repliesCount = 0;
  }
  newMap.set(response._id, response);
  return newMap;
}

const responsesReducer = createReducer({
  [actions.createResponse]: state => ({ ...state, responseStatus: 'create' }),
  [actions.createResponseSuccess]: (state, payload) => ({
    ...state,
    responseStatus: 'created',
    docs: addItem(state.docs, payload),
  }),
  [actions.fetchResponses]: state => ({ ...state, responseStatus: 'fetch' }),
  [actions.fetchResponsesSuccess]: (state, payload) => ({
    ...state,
    ...payload,
    responseStatus: null,
    docs: addMultipleItems(state.docs, arrayToMap(payload.docs)),
  }),
  [actions.deleteResponse]: (state, payload) => ({
    ...state,
    docs: deleteItem(state.docs, payload),
  }),
  [actions.addResponse]: (state, payload) => ({ ...state, docs: addItem(state.docs, payload) }),
  [actions.clearResponseStatus]: state => ({ ...state, responseStatus: null, loadingReplies: null }),
  [actions.likeResponse]: (state, payload) => ({ ...state, docs: responseLike(state.docs, payload.id) }),
  [actions.likeResponseRes]: (state, payload) => {
    const { error, id } = payload;
    if (error) {
      return { ...state, docs: responseLike(state.docs, id) };
    }
    return { ...state };
  },
  [actions.fetchReplies]: (state, payload) => ({
    ...state,
    loadingReplies: payload.type,

  }),
  // Replies actions
  [actions.selectedResponseForReply]: (state, payload) => ({
    ...state,
    loadingReplies: null,
    selectedResponse: {
      ...state.selectedResponse,
      response: payload,
    },

  }),
  [actions.fetchRepliesSuccess]: (state, payload) => ({
    ...state,
    loadingReplies: null,
    selectedResponse: {
      ...state.selectedResponse,
      ...payload,
      docs: addMultipleItems(state.selectedResponse.docs, arrayToMap(payload.docs)),
    },
  }),
  [actions.fetchRepliesFailed]: state => ({
    ...state,
    loadingReplies: 'error',
  }),
  [actions.createReply]: state => ({
    ...state,
    loadingReplies: 'creating',
  }),
  [actions.createReplySuccess]: (state, payload) => ({
    ...state,
    docs: repliesCount(state.docs, state.selectedResponse.response._id, 1),
    loadingReplies: 'created',
    selectedResponse: {
      ...state.selectedResponse,
      docs: addItem(state.selectedResponse.docs, payload),
    },
  }),
  [actions.deleteReply]: (state, payload) => ({
    ...state,
    docs: repliesCount(state.docs, state.selectedResponse.response._id, -1),
    selectedResponse: {
      ...state.selectedResponse,
      docs: deleteItem(state.selectedResponse.docs, payload),
    },
  }),
  [actions.resetReplies]: state => ({
    ...state,
    selectedResponse: initialState.responses.selectedResponse,
  }),
  [actions.initResponses]: state => initialState,
}, initialState);

export default responsesReducer;
