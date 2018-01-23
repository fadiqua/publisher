'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _notificationsController = require('../controllers/notificationsController');

var _notificationsController2 = _interopRequireDefault(_notificationsController);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function notifications(routes) {
    routes.post("/notifications", _services.jwtAuth, (0, _services.asyncMiddleware)(_notificationsController2.default.markNotificationAsRead));
    routes.get("/notifications", _services.jwtAuth, (0, _services.asyncMiddleware)(_notificationsController2.default.getNotifications));
    routes.get("/notifications/:id", _services.jwtAuth, (0, _services.asyncMiddleware)(_notificationsController2.default.getNotificationById));
    routes.post("/notifications/all", _services.jwtAuth, (0, _services.asyncMiddleware)(_notificationsController2.default.clearUnreadBadgeCount));
    routes.get("/notifications/unread", _services.jwtAuth, (0, _services.asyncMiddleware)(_notificationsController2.default.getUnreadCount));
}

exports.default = notifications;
//# sourceMappingURL=notifications.js.map