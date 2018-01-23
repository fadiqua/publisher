'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _storyController = require('../controllers/storyController');

var _storyController2 = _interopRequireDefault(_storyController);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const requireAuth =  passport.authenticate('jwt',{session:false});

// import passport from 'passport';
function story(routes) {
    routes.post("/story", _services.jwtAuth, (0, _services.asyncMiddleware)(_storyController2.default.post));
    routes.put("/story", _services.jwtAuth, (0, _services.asyncMiddleware)(_storyController2.default.updateStory));
    routes.delete("/story", _services.jwtAuth, (0, _services.asyncMiddleware)(_storyController2.default.deleteStory));
    routes.get("/popular", (0, _services.asyncMiddleware)(_storyController2.default.getPopularStories));
    routes.get("/story/:slug", (0, _services.asyncMiddleware)(_storyController2.default.get));
    routes.get("/story/id/:id", (0, _services.asyncMiddleware)(_storyController2.default.getById));
    routes.get("/posts", (0, _services.asyncMiddleware)(_storyController2.default.getAll));
    routes.get("/home", _storyController2.default.getHomePageData);
    routes.get("/topic/stories/", _storyController2.default.getStoriesByTopic);
    routes.get("/tag/:tag", (0, _services.asyncMiddleware)(_storyController2.default.getStoriesByTag));
}

exports.default = story;
//# sourceMappingURL=story.js.map