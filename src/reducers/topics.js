import { createReducer } from 'redux-act';
// import initialState from './initialState';
import * as actions from '../actions/actionTypes';

export const initialState = {
  loading: true,
  selectedTopic: {},
  menu: [
    {
      label: 'Main',
      key: 'main',
      items: [
        {
          name: 'Home',
          icon: 'home',
          url: '/',
          slug: '',
        },
        {
          name: 'Popular',
          url: '/popular',
          icon: 'whatshot',
          slug: 'popular',
        },
        {
          name: 'Members Only',
          key: '/members-only',
          icon: 'group',
          slug: 'members-only',
        },
      ],
    },
    {
      label: 'Topics',
      key: 'topics',
      items: [

      ],
    },
    {
      label: 'Help',
      key: 'help',
      items: [
        {
          name: 'Search',
          url: '/search/?q=',
          key: '/search',
          icon: 'search',
          slug: 'search',
        },
        {
          name: 'FQA',
          url: '/faq',
          key: '/faq',
          icon: 'help',
          slug: 'faq',
        }],
    },
  ],
};

const topicsReducer = createReducer({
  [actions.fetchTopics]: state => ({ ...state, loading: true }),
  [actions.fetchTopicsSuccess]: (state, payload) => {
    const menu = [...state.menu];
    menu[1].items = payload;
    return {
      ...state, loading: false, menu,
    };
  },
  [actions.fetchCategory]: state => ({ ...state, fetching: true }),
  [actions.siderFulfilled]: (state, payload) => ({ ...state, fetching: false, sider: payload }),
  [actions.topicsFulfilled]: (state, payload) => ({ ...state, topics: payload }),
}, initialState);

export default topicsReducer;
