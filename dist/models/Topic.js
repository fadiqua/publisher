'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var topicSchema = new _mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Username must be 3 characters or more.']
    },
    icon: {
        type: String,
        required: true
    },
    slug: {
        type: String
        // required: true
    }

});

var Topic = _mongoose2.default.model('Topic', topicSchema);

exports.default = Topic;
//# sourceMappingURL=Topic.js.map