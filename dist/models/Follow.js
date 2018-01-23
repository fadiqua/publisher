'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var followSchema = new _mongoose.Schema({
    _user: {
        required: true,
        type: _mongoose.Schema.ObjectId, ref: 'User'
    },
    _followed: {
        required: true,
        type: _mongoose.Schema.ObjectId, ref: 'User'
    },
    type: {
        type: String,
        default: 'friend'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { toJSON: { virtuals: true } });

followSchema.plugin(_mongoosePaginate2.default);

var autoPopulate = function autoPopulate(next) {
    this.where({ isDeleted: false }).populate({
        path: '_user',
        select: 'thumbnail username firstName lastName displayName _id createdAt'
    }).populate({
        path: '_followed',
        select: 'thumbnail username firstName lastName displayName _id createdAt'
    });
    next();
};
followSchema.pre('find', autoPopulate);

followSchema.pre('findOne', autoPopulate);

followSchema.post('save', function (model, next) {
    Promise.all([_User2.default.findByIdAndUpdate(model._user, {
        $push: {
            _following: model._followed
        }
    }), _User2.default.findByIdAndUpdate(model._followed, {
        $push: {
            _followers: model._user
        }
    })]).then(function () {
        next();
    }).catch(function (error) {

        throw new Error("");
    });
});

followSchema.pre('remove', function (next) {
    Promise.all([_User2.default.findByIdAndUpdate(this._user, {
        $pull: {
            _following: this._followed
        }
    }), _User2.default.findByIdAndUpdate(this._followed, {
        $pull: {
            _followers: this._user
        }
    })]).then(function () {
        next();
    }).catch(function (error) {
        throw new Error("");
    });
});

var Follow = _mongoose2.default.model('Follow', followSchema);
exports.default = Follow;
//# sourceMappingURL=Follow.js.map