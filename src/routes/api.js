import axios from 'axios';

// auth -------------------------------
export function localLogin(payload) {
    return axios.post('/api/login', payload)
}
export function localSignup(payload) {
    return axios.post('/api/signup', payload)
}

export function socialLogin(payload) {
    return axios.post('/api/socialLogin', payload)
}

export function getMe() {
    return axios.get('/api/user/me');
}


// Notifications ----------------------------------
export function getUnreadNotifCount() {
    return axios.get('/api/notifications/unread')
}

export function markNotificationRead(id) {
    return axios.post(`/api/notifications`, { id })
}

export function getNotifications(page) {
    return axios.get('/api/notifications', { params: { page } })
}

export function clearUnreadBadgeCountAPI() {
    return axios.post(`/api/notifications/all`)
}

//  --------------------------------------------
export function deleteResponse(id, storyId, owner, parentId=null) {
    return axios.delete(`/api/response`,
        { params: { id, storyId, owner, parentId } })
}

export function updateResponse(id, text, owner) {
    return axios.put(`/api/response`, {id, text, owner })
}

export function fetchHomePageData() {
    return axios.get(`/api/home`)
}

// users -------------------------------------
export function getUserByUsername(username) {
    return axios.get(`/api/user/${username}`)
}

export function getProfileStories(username, page) {
    return axios.get(`/api/user/${username}/stories`, {
        params: { page }
    })
}

export function getProfileResponses(username, page) {
    return axios.get(`/api/user/${username}/responses`, {
        params: { page }
    })
}

export function updateProfile(payload) {
    return axios.put(`/api/user`, {
        data: payload
    })
}

// Search ----------------------------------------
export function search(value) {
    return axios.get(`/api/search`, { params: { value } })
}

export function advancedSearch(query, page=1) {
    return axios.get(`/api/advancedSearch/${query}`, {
        params: {
            page
        }
    })
}

// Follow & Like --------------------------------------
export function followUser(id) {
    return axios.post(`/api/follow`, { id })
}

export function getFollowers(id, page=1) {
    return axios.get(`/api/followers/${id}`, {
        params: {
            page
        }
    })
}

export function getFollowings(id, page=1) {
    return axios.get(`/api/followings/${id}`, {
        params: {
            page
        }
    })
}

export function like(payload) {
    return axios.post(`/api/like`, {
        ...payload
    })
}

// Topics & Stories & Responses -----------------------
export function createStory({ story }) {
    return axios.post('/api/story', story)
}

export function getStory(slug) {
    return axios.get(`/api/story/${slug}`)
}

export function deleteStory(id) {
    return axios.delete('/api/story',{
        params: { id }
    })
}

export function editStory(data) {
    return axios.put('/api/story', data)
}

export function createResponse(data) {
    return axios.post(`/api/response`, data)
}

export function getResponses(id, page = 1) {
    return axios.get(`/api/response/${id}`, {
        params: { page }
    })
}

export function getResponseById(id) {
    return axios.get(`/api/response/${id}/response`);
}

export function getReplies(id, page = 1) {
    return axios.get(`/api/response/${id}/replies`, {
        params: { page }
    })
}

export function createReply(data) {
    return axios.post(`/api/response`, data)
}

export function getPopularStories(page=1) {
    return axios.get(`/api/popular`, {
        params: {
            page: page
        }
    });
}

export function getStoriesByTag(tag, page=1) {
    return axios.get(`/api/tag/${tag}`, {
        params: {
            page
        }
    })
}

export function getCurrentTopicStories(query, topic) {
    return axios.get(`/api/topic/stories/${query}`, {
        params: { topic }
    })
}

export function getTopics() {
    return axios.get('/api/topics')
}

// -------------------------------------
export function uploadBase64(payload) {
    return axios.post(`/api/files/profile`, {
        ...payload
    })
}
