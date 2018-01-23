'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _responseController = require('../controllers/responseController');

var _responseController2 = _interopRequireDefault(_responseController);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const requireAuth =  passport.authenticate('jwt',{session:false});

function response(routes) {
    routes.post("/response", _services.jwtAuth, (0, _services.asyncMiddleware)(_responseController2.default.post));
    routes.delete("/response", _services.jwtAuth, _services.checkPermission.isOwner, (0, _services.asyncMiddleware)(_responseController2.default.delete));
    routes.put("/response", _services.jwtAuth, _services.checkPermission.isOwner, _responseController2.default.update);
    routes.get("/response/:storyId", (0, _services.asyncMiddleware)(_responseController2.default.get));
    // routes.get("/response/:username/stories", asyncMiddleware(responseController.getUserResponses));
    routes.get("/response/:responseId/response", (0, _services.asyncMiddleware)(_responseController2.default.getReponseById));
    routes.get("/response/:responseId/replies", (0, _services.asyncMiddleware)(_responseController2.default.getReplies));
}
// import passport from 'passport';
exports.default = response;
//# sourceMappingURL=response.js.map