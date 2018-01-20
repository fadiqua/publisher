import { all, fork } from 'redux-saga/effects';

import {  watchFollowUser, autoLoginFlow, loginFlowFromSocial } from './auth';
import { watchFetchTopics } from './topics';
import {
    watchFetchStory,
    watchCreateResponse,
    watchFetchResponses,
    watchFetchReplies,
    watchCreateReply
} from './story';
import { watchFetchCurrentTopicStories } from './currentTopic';
import { watchFetchNotifications, watchMarkNotificationAsRead }  from './notifications';
import {
    watchFetchProfile, watchFetchProfileStories,
    watchFetchProfileResponses
}  from './profile';

export default function* rootSaga() {
    yield all([
        watchFollowUser(),
        watchFetchTopics(),
        watchFetchStory(),
        watchCreateResponse(),
        watchFetchResponses(),
        watchFetchReplies(),
        watchCreateReply(),
        watchFetchCurrentTopicStories(),
        watchFetchNotifications(),
        watchMarkNotificationAsRead(),
        watchFetchProfile(),
        watchFetchProfileStories(),
        watchFetchProfileResponses(),
        fork(loginFlowFromSocial),
        fork(autoLoginFlow),
    ])
}