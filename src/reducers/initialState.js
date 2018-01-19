export default {
    screenSize: {
        desktop:false,
        mobile: false,
        collapsed: false,
        siderSelected: 'home'
    },
    sign: {
        siginVisible: false,
        signupvisible: false,
        loading: false,
        signinErrors: {
            error: true,
            errors: []
        },
        signupErrors: {
            error: true,
            errors: []
        }
    },
    auth: {
        loading: true,
        isAuthenticated: false,
        error: {
            isError: false,
            msg: {}
        },
        currentUser: {
            _id: null,
            username: null,
            email: null,
            displayName: null,
            photoURL: null
        }
    },
    topics: {
        loading: false,
        selectedTopic: {},
        items: []
    },
    profile: {
        loading: null,
        user: {
            _followers: [],
            _following: []
        },
        stories: {
            docs: [],
            page: 1,
            pages: "1"
        },
    },
    story: {
        mode: 'create',
        loading: false,
        responseStatus: null,
        showResponses: false,
        currentStory: {
            _creator: {},
            _comments: [],
            _likes:[]
        }
    },
    responses:  {
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
        }

    },
    currentTopic: {
        loading: false,
        error: false,
        sortBy: 'date',
        limit: 0,
        page: 1,
        docs: [],

    },
    notifications: {
        fetching: null,
        limit: 6,
        page: 1,
        pages: 1,
        total: 0,
        unreadCount: 0,
        items: new Map()
    }
}