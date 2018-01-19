import { createReducer } from 'redux-act';

import initialState from './initialState';
import * as actions from '../actions/actionTypes';
import { addItem, addMultipleItems, deleteItem, sortMapByDate } from '../utils/functions';

const notificationsReducer = createReducer({
    [actions.getUnReadInitialNotificationsCount]: (state, payload) => ({
        ...state,
        unreadCount: payload
    }),
    [actions.fetchNotifications]: (state, payload) => ({
        ...state,
        fetching: payload.type
    }),
    [actions.fetchNotificationsSuccess]: (state, payload) => ({
        ...state,
        fetching: null,
        limit: payload.limit,
        page: payload.page,
        pages: payload.pages,
        total: payload.total,
        items: addMultipleItems(state.items, payload.docs)
    }),
    [actions.addNotifications]: (state, payload) =>({
        ...state,
        unreadCount: state.unreadCount + 1,
        items:  addItem(state.items, payload)
    }),
    [actions.newNotification]: (state, payload) =>({
        ...state,
        unreadCount: state.unreadCount + 1,
        payload,
        items: sortMapByDate(addItem(state.items, payload.notification))
    }),
    [actions.removeNotification]: (state, payload) => {
        if(state.items.size !== 0) {
            return {
                ...state,
                unreadCount: state.unreadCount !== 0 ? state.unreadCount - 1 : 0,
                items: deleteItem(state.items, payload)
            }
        }
        return { ...state }

    },
    [actions.clearUnreadBadgeNotifications]: (state) =>({
        ...state,
        unreadCount: 0
    }),
    [actions.markNotificationAsReadSuccess]: (state, payload) => {
        const newItems = markNotificationsAsRead(state.items, payload);
        return {
            ...state,
            items: newItems,
            unreadCount: !payload ? 0: state.unreadCount
        }
    },
}, initialState.notifications); // <-- This is the default state

function markNotificationsAsRead(map, payload) {
    let newItems = new Map();
    map.forEach((item, key) => {
        if(!payload){
            item.isClicked=true;
            item.isRead=true;
        }
        newItems.set(key, item)
    });
    if(payload){
        const target = newItems.get(payload);
        target.isClicked = true;
        target.isRead=true;
        newItems.set(payload, target)
    }
    return newItems;
}
export default notificationsReducer;
