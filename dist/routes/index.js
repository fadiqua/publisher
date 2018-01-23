'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _story = require('./story');

var _story2 = _interopRequireDefault(_story);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

var _topic = require('./topic');

var _topic2 = _interopRequireDefault(_topic);

var _uploads = require('./uploads');

var _uploads2 = _interopRequireDefault(_uploads);

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _like = require('./like');

var _like2 = _interopRequireDefault(_like);

var _generic = require('./generic');

var _generic2 = _interopRequireDefault(_generic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express2.default)();
(0, _user2.default)(routes);
(0, _story2.default)(routes);
(0, _response2.default)(routes);
(0, _topic2.default)(routes);
(0, _uploads2.default)(routes);
(0, _notifications2.default)(routes);
(0, _like2.default)(routes);
(0, _generic2.default)(routes);

exports.default = routes;
//# sourceMappingURL=index.js.map