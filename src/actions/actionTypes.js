import { createAction } from 'redux-act';

export const siderCollapsed = createAction('sider collapsed');
export const isDesktop = createAction('desktop');
export const isMobile = createAction('mobile');
export const siderSelected = createAction('sider selected');
// sign
export const toggleSignin = createAction('toggleSignin');
export const toggleSignup = createAction('toggleSignup');
export const signinRequest = createAction('signin request');

// categories
export const fetchTopics = createAction('fetch topics');
export const fetchTopicsSuccess = createAction('fetch topics success');
export const fetchCategory = createAction('fetch category');
export const siderFulfilled = createAction('sider fulfilled');
export const topicsFulfilled = createAction('topics fulfilled');

// profile
export const fetchProfile = createAction('fetch profile');
export const fetchProfileSuccess = createAction('fetch profile success');
export const fetchProfileError = createAction('fetch profile error');
export const updateProfile = createAction('update profile');
export const fetchProfileStories = createAction('fetch profile stories');
export const fetchProfileStoriesSuccess = createAction('fetch profile stories success');
export const fetchProfileResponses = createAction('fetch profile responses');
export const followProfile = createAction('follow profile');
export const fetchProfileResponsesSuccess = createAction('fetch profile responses success');
export const initResponses = createAction('init responses ');

// Story
export const fetchStory = createAction('fetch story');
export const fetchStorySuccess = createAction('fetch story success');
export const clearCreatedStory = createAction('clear created story');

// Responses
export const createResponse = createAction('create response');
export const createResponseSuccess = createAction('create response success');
export const fetchResponses = createAction('fetch responses');
export const fetchResponsesSuccess = createAction('fetch responses success');
export const clearResponseStatus = createAction('clear responses status');
export const deleteResponse = createAction('delete response');
export const addResponse = createAction('add response');
export const likeStory = createAction('like story');
export const likeComment = createAction('like comment');
export const likeResponse = createAction('like response');
export const selectedResponseForReply = createAction('selected response for reply');
export const fetchReplies = createAction('fetch replies');
export const fetchRepliesSuccess = createAction('fetch replies success');
export const fetchRepliesFailed = createAction('fetch replies failed');
export const createReply = createAction('create reply');
export const createReplySuccess = createAction('create reply success');
export const createReplyFailed = createAction('create reply failed');
export const updateReply = createAction('update reply');
export const deleteReply = createAction('delete reply');
export const resetReplies = createAction('reset reply');

// current topic
export const fetchCurrentTopic = createAction('fetch current topic');
export const fetchCurrentTopicSuccess = createAction('fetch current topic success');
export const fetchCurrentTopicFailed = createAction('fetch current topic failed');

// notifications
export const newNotification = createAction('new notification');
export const removeNotification = createAction('remove notification');
export const sendMessage = createAction('send message');
export const fetchNotifications = createAction('fetchNotifications');
export const fetchNotificationsSuccess = createAction('fetchNotificationsSuccess');
export const addNotifications = createAction('addNotifications');
export const clearUnreadBadgeNotifications = createAction('clearUnreadBadgeNotifications');
export const markNotificationAsRead = createAction('mark Notification As Read');
export const markNotificationAsReadSuccess = createAction('mark Notification As Read success');
export const getUnReadInitialNotificationsCount =  createAction(' get unRead initialNotifications count');

// user
export const fetchUserFromSocial = createAction('fetch user');
export const fetchUserSuccess = createAction('fetch user success');
export const fetchUserFailed = createAction('fetch user failed');
export const updateUser = createAction('update user');
export const followUser = createAction('follow user');
export const followUserSuccess = createAction('follow user success');
export const autoLogin = createAction('auto login');
export const loginFailed = createAction('loginFailed');
export const login = createAction('login');
export const logout = createAction('logout');

export const addUser = createAction('add user');
export const removeUser = createAction('remove user');
