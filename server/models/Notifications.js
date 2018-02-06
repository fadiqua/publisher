import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import server from '../index';
import { socket } from '../socketio/socketServer';

const notificationsSchema = new Schema({
  _from: {
    type: Schema.ObjectId, ref: 'User',
  },
  _to: {
    type: Schema.ObjectId, ref: 'User',
  },
  type: {
    type: String,
  },
  content: {
    type: String,
  },
  _parentTarget: {
    type: Schema.ObjectId, ref: 'Story',
  },
  _target: String,
  isRead: {
    type: Boolean,
    default: false,
  },
  isClicked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const autoPopulate = function (next) {
  this.populate({
    path: '_from',
    select: 'thumbnail username firstName lastName displayName _id',
  }).populate('_parentTarget');
  next();
};

notificationsSchema.plugin(mongoosePaginate);

notificationsSchema.pre('find', autoPopulate);

notificationsSchema.post('save', (model, next) => {
  mongoose.model('Notifications')
    .populate(model, '_from _parentTarget',
      // {
      // path: "_from",
      // select: 'thumbnail username firstName lastName _id'
      // }
    ).then((data) => {
      // server.io.emit(`notification.new_${model._to}`, {
      //     notification: data
      // });
      socket.emit(`notification.new_${model._to}`, {
        notification: data,
      });
    });
  next();
});

notificationsSchema.post('findOneAndRemove', (model, next) => {
  console.log('remove noti ', model._to);
  // server.io.emit(`notification.remove_${model._to}`, {
  //     notification: model._id
  // });
  socket.emit(`notification.remove_${model._to}`, {
    notification: model._id,
  });
  next();
});

const Notifications = mongoose.model('Notifications', notificationsSchema);

export default Notifications;
