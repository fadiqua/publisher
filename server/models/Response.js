import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const responseSchema = new Schema({

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
    _parent: { type: Schema.ObjectId, ref:'Response' },
    _likes: [{ type: Schema.ObjectId, ref:'Like' }]
},{ toJSON: { virtuals: true }});

// await mongoose.model('Comment').find({_parent: model._id}).count();
responseSchema.virtual('likesCount').get(function () {
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
// responseSchema.virtual('repliesCount',  {
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
responseSchema.pre('findById', autoPopulateCreator);
responseSchema.pre('find', autoPopulateCreator);
responseSchema.pre('findByIdAndUpdate', function (next) {
    if(this.repliesCount < 0) {
        this.repliesCount = 0;
    }
    next();
});
responseSchema.plugin(mongoosePaginate);

const Response = mongoose.model('Response', responseSchema);

export default Response;
