'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var responseSchema = new _mongoose.Schema({

    text: {
        type: String,
        required: true,
        minlength: [5, 'content must be 5 characters or more.']
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
        type: _mongoose.Schema.ObjectId, ref: 'User'
    },
    _story: {
        type: _mongoose.Schema.ObjectId, ref: 'Story'
    },
    repliesCount: { type: Number, default: 0, min: 0, integer: true },
    _parent: { type: _mongoose.Schema.ObjectId, ref: 'Response' },
    _likes: [{ type: _mongoose.Schema.ObjectId, ref: 'Like' }]
}, { toJSON: { virtuals: true } });

// await mongoose.model('Comment').find({_parent: model._id}).count();
responseSchema.virtual('likesCount').get(function () {
    var likesCount = this._likes.length;
    this._likes = [];
    return likesCount;
});

var autoPopulateCreator = function autoPopulateCreator(next) {
    this.populate({
        path: '_creator',
        select: 'thumbnail username firstName lastName _id'
    });
    this.where('isDeleted').equals(false);
    next();
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
    if (this.repliesCount < 0) {
        this.repliesCount = 0;
    }
    next();
});
responseSchema.plugin(_mongoosePaginate2.default);

var Response = _mongoose2.default.model('Response', responseSchema);

exports.default = Response;
//# sourceMappingURL=Response.js.map