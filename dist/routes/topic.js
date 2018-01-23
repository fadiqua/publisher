"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _topicController = require("../controllers/topicController");

var _topicController2 = _interopRequireDefault(_topicController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function topic(routes) {
    routes.post("/topic", _topicController2.default.post);
    routes.get("/topics", _topicController2.default.get);
}

exports.default = topic;
//# sourceMappingURL=topic.js.map