import { all, fork } from 'redux-saga/effects';

import {
    watchFollowUser,
    autoLoginFlow,
    loginFlowFromSocial
} from './auth';
import { watchFetchTopics } from './topics';
import {
    watchFetchStory,
    watchLikeStory,
} from './story';
import {
    watchCreateResponse,
    watchFetchResponses,
    watchFetchReplies,
    watchCreateReply,
    watchLikeResponse
} from './responses';
import { watchFetchCurrentTopicStories } from './currentTopic';
import {
    watchFetchNotifications,
    watchMarkNotificationAsRead
}  from './notifications';
import {
    watchFetchProfile,
    watchFetchProfileStories,
    watchFetchProfileResponses
}  from './profile';

export default function* rootSaga() {
    yield all([
        watchFollowUser(),
        watchFetchTopics(),
        watchFetchStory(),
        watchLikeStory(),
        watchCreateResponse(),
        watchFetchResponses(),
        watchLikeResponse(),
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