import axios from 'axios';

export function localLogin(payload) {
    return axios.post('/api/login', payload)
}

export function deleteResponse(id, storyId, owner, parentId=null) {
    return axios.delete(`/api/comment`,
        { params: { id, storyId, owner, parentId } })
}

export function updateResponse(id, text, owner) {
    return axios.put(`/api/comment`, {id, text, owner })
}

export function fetchHomePageData() {
    return axios.get(`/api/home`)
}

export function getUserById(id) {
    return axios.get(`/api/user/${id}`)
}
export function followUser(id) {
    return axios.post(`/api/follow`, { id })
}

export function clearUnreadBadgeCountAPI() {
    return axios.post(`/api/notifications/all`)
}
export function like(payload) {
    return axios.post(`/api/like`, {
        ...payload
    })
}

export function uploadBase64(payload) {
    return axios.post(`/api/files/profile`, {
        ...payload
    })
}

export function updateProfile(payload) {
    return axios.put(`/api/user`, {
        data: payload
    })
}

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

export function getResponseById(id) {
    return axios.get(`/api/comment/${id}/response`);
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