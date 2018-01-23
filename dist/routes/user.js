'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const localAuth = passport.authenticate('local', {session:false});

function user(routes) {
    routes.post("/login", (0, _services.asyncMiddleware)(_userController2.default.login));
    routes.post("/socialLogin", (0, _services.asyncMiddleware)(_userController2.default.socialLogin));
    routes.post("/signup", (0, _services.asyncMiddleware)(_userController2.default.localSignup));
    routes.put("/user", _services.jwtAuth, (0, _services.asyncMiddleware)(_userController2.default.updateProfile));
    routes.get("/user/me", (0, _services.asyncMiddleware)(_userController2.default.getMe));
    routes.get("/user/:username", (0, _services.asyncMiddleware)(_userController2.default.getUserByUsername));
    routes.get("/user/:username/stories", (0, _services.asyncMiddleware)(_userController2.default.getUserStories));
    routes.get("/user/:username/responses", (0, _services.asyncMiddleware)(_userController2.default.getUserResponses));
    routes.post("/follow", _services.jwtAuth, _userController2.default.followUser);
    routes.get("/followers/:id", _userController2.default.getFollowers);
    routes.get("/followings/:id", _userController2.default.getFollowings);
}
// import passport from 'passport';
exports.default = user;
//# sourceMappingURL=user.js.map