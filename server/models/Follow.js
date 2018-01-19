import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import User from './User';

const followSchema = new Schema({
   _user:{
       required: true,
       type: Schema.ObjectId, ref:'User'
   },
    _followed: {
        required: true,
        type: Schema.ObjectId, ref:'User'
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

followSchema.plugin(mongoosePaginate);

const autoPopulate = function (next) {
    this.where({isDeleted: false})
        .populate({
            path: '_user',
            select: 'thumbnail username firstName lastName displayName _id createdAt'
        }).populate({
        path: '_followed',
        select: 'thumbnail username firstName lastName displayName _id createdAt'
    });
    next()
};
followSchema.pre('find', autoPopulate);

followSchema.pre('findOne', autoPopulate);

followSchema.post('save', (model, next) => {
    Promise.all([
        User.findByIdAndUpdate(model._user, {
            $push: {
                _following: model._followed
            }
        }),
        User.findByIdAndUpdate(model._followed, {
            $push: {
                _followers: model._user
            }
        })
    ]).then(() => {
        next()
    }).catch(error => {

        throw new Error("")
    })

});

followSchema.pre('remove', function( next) {
    Promise.all([
        User.findByIdAndUpdate(this._user, {
            $pull: {
                _following: this._followed
            }
        }),
        User.findByIdAndUpdate(this._followed, {
            $pull: {
                _followers: this._user
            }
        })
    ]).then(() => {
        next()
    }).catch(error => {
        throw new Error("")
    })
});

const Follow = mongoose.model('Follow', followSchema);
export default Follow;