'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var topicController = {};

topicController.post = function (req, res) {
    var _req$body = req.body,
        name = _req$body.name,
        icon = _req$body.icon;

    var topicObj = new _index2.default.Topic({
        name: name,
        icon: icon
    });
    topicObj.save().then(function () {
        res.status(201).json({
            success: true,
            data: topicObj
        });
    }).catch(function (error) {
        res.status(500).json({
            success: false,
            error: error
        });
    });
};
topicController.get = function (req, res) {
    _index2.default.Topic.find({}).then(function (topics) {
        res.status(200).json({
            success: true,
            topics: topics
        });
    }).catch(function (error) {
        res.status(500).json({
            success: false,
            error: error
        });
    });
};
exports.default = topicController;
//# sourceMappingURL=topicController.js.map