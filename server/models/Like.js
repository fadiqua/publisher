import mongoose, { Schema } from 'mongoose';

const likeSchema = new Schema({
  _creator: {
    type: Schema.ObjectId, ref: 'User',
  },
  type: {
    type: String,
    required: true,
  },
  _object: {
    type: Schema.ObjectId,
  },
  _parent: { type: Schema.ObjectId },

  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Like', likeSchema);
