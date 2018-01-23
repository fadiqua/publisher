'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _likeController = require('../controllers/likeController');

var _likeController2 = _interopRequireDefault(_likeController);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import checkPermission from '../services/checkPermissions';

function like(routes) {
    routes.post("/like", _services.jwtAuth, _likeController2.default.post);
}
// import passport from 'passport';
exports.default = like;
//# sourceMappingURL=like.js.map