'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var likeSchema = new _mongoose.Schema({
    _creator: {
        type: _mongoose.Schema.ObjectId, ref: 'User'
    },
    type: {
        type: String,
        required: true
    },
    _object: {
        type: _mongoose.Schema.ObjectId
    },
    _parent: { type: _mongoose.Schema.ObjectId },

    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

exports.default = _mongoose2.default.model('Like', likeSchema);
//# sourceMappingURL=Like.js.map