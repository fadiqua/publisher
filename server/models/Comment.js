import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const commentSchema = new Schema({

    text: {
        type: String,
        required: true,
        minlength: [5, 'content must be 5 characters or more.'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    _creator: {
        type: Schema.ObjectId, ref:'User'
    },
    _story: {
        type: Schema.ObjectId, ref:'Story'
    },
    repliesCount: { type: Number, default: 0, min:0, integer: true },
    _parent: { type: Schema.ObjectId, ref:'Comment' },
    _likes: [{ type: Schema.ObjectId, ref:'Like' }]
},{ toJSON: { virtuals: true }});

// await mongoose.model('Comment').find({_parent: model._id}).count();
commentSchema.virtual('likesCount').get(function () {
    const likesCount = this._likes.length;
    this._likes = [];
    return likesCount;
});


const autoPopulateCreator = function(next) {
    this.populate({
        path: '_creator',
        select: 'thumbnail username firstName lastName _id'
    });
    this.where('isDeleted').equals(false);
    next()
};
// commentSchema.virtual('repliesCount',  {
//     ref: 'Comment',
//     localField: '_id',
//     foreignField: '_parent'
// })
//     .get(async function() {
//     mongoose.model('Comment').count({_parent: this._id})
//         .then(count => {
//             console.log('count ', count);
//             return count
//         })
//         .catch(error => {
//             return 0
//         })
// });
commentSchema.pre('findById', autoPopulateCreator);
commentSchema.pre('find', autoPopulateCreator);
commentSchema.pre('findByIdAndUpdate', function (next) {
    if(this.repliesCount < 0) {
        this.repliesCount = 0;
    }
    next();
});
commentSchema.plugin(mongoosePaginate);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
