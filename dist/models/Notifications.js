'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notificationsSchema = new _mongoose.Schema({
    _from: {
        type: _mongoose.Schema.ObjectId, ref: 'User'
    },
    _to: {
        type: _mongoose.Schema.ObjectId, ref: 'User'
    },
    type: {
        type: String
    },
    content: {
        type: String
    },
    _parentTarget: {
        type: _mongoose.Schema.ObjectId, ref: 'Story'
    },
    _target: String,
    isRead: {
        type: Boolean,
        default: false
    },
    isClicked: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

function autoPopulate(next) {
    this.populate({
        path: "_from",
        select: 'thumbnail username firstName lastName displayName _id'
    }).populate('_parentTarget');
    next();
}
notificationsSchema.plugin(_mongoosePaginate2.default);

notificationsSchema.pre('find', autoPopulate);

notificationsSchema.post('save', function (model, next) {
    _mongoose2.default.model('Notifications').populate(model, '_from _parentTarget'
    // {
    // path: "_from",
    // select: 'thumbnail username firstName lastName _id'
    // }
    ).then(function (data) {
        _index2.default.io.emit('notification.new_' + model._to, {
            notification: data
        });
    });
    next();
});

notificationsSchema.post('findOneAndRemove', function (model, next) {
    console.log('remove noti ', model._to);
    _index2.default.io.emit('notification.remove_' + model._to, {
        notification: model._id
    });
    next();
});

var Notifications = _mongoose2.default.model('Notifications', notificationsSchema);

exports.default = Notifications;
//# sourceMappingURL=Notifications.js.map