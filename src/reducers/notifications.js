// npm packages
import { createReducer } from 'redux-act';
// project files
import * as actions from '../actions/actionTypes';
import { addItem, addMultipleItems, deleteItem, sortMapByDate } from '../utils/functions';

export const initialState = {
	fetching: null,
	limit: 6,
	page: 1,
	pages: 1,
	total: 0,
	unreadCount: 0,
	items: new Map(),
};

function markNotificationsAsRead(map, payload) {
	const newItems = new Map();
	map.forEach((item, key) => {
		const obj = item;
		if (!payload) {
			obj.isClicked = true;
			obj.isRead = true;
		}
		newItems.set(key, obj);
	});
	if (payload) {
		const target = newItems.get(payload);
		target.isClicked = true;
		target.isRead = true;
		newItems.set(payload, target);
	}
	return newItems;
}

const notificationsReducer = createReducer({
	[actions.getUnReadInitialNotificationsCount]: (state, payload) => ({
		...state,
		unreadCount: payload,
	}),
	[actions.fetchNotifications]: (state, payload) => ({
		...state,
		fetching: payload.type,
	}),
	[actions.fetchNotificationsSuccess]: (state, payload) => ({
		...state,
		fetching: null,
		limit: payload.limit,
		page: payload.page,
		pages: payload.pages,
		total: payload.total,
		items: addMultipleItems(state.items, payload.docs),
	}),
	[actions.addNotifications]: (state, payload) => ({
		...state,
		unreadCount: state.unreadCount + 1,
		items: addItem(state.items, payload),
	}),
	[actions.newNotification]: (state, payload) => ({
		...state,
		unreadCount: state.unreadCount + 1,
		payload,
		items: sortMapByDate(addItem(state.items, payload.notification)),
	}),
	[actions.removeNotification]: (state, payload) => {
		if (state.items.size !== 0) {
			return {
				...state,
				unreadCount: state.unreadCount !== 0 ? state.unreadCount - 1 : 0,
				items: deleteItem(state.items, payload),
			};
		}
		return { ...state };
	},
	[actions.clearUnreadBadgeNotifications]: state => ({
		...state,
		unreadCount: 0,
	}),
	[actions.markNotificationAsReadSuccess]: (state, payload) => {
		const newItems = markNotificationsAsRead(state.items, payload);
		return {
			...state,
			items: newItems,
			unreadCount: !payload ? 0 : state.unreadCount,
		};
	},
}, initialState);

export default notificationsReducer;
