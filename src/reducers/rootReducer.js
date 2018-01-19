import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import screenSizeReducer from './screenSize';
import signReducer from './sign';
import authReducer from './auth';
import profileReducer from './profile';
import storyReducer from './story';
import topicsReducer from './topics';
import currentTopicReducer from './currentTopic';
import notificationsReducer from './notifications';
import responsesReducer from './responses';

export default combineReducers({
    screenSize: screenSizeReducer,
    sign: signReducer,
    auth: authReducer,
    topics: topicsReducer,
    profile: profileReducer,
    story: storyReducer,
    currentTopic: currentTopicReducer,
    notifications: notificationsReducer,
    responses: responsesReducer,
    router: routerReducer
});