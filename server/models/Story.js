import mongoose , { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import paginateRecords from '../plugins/paginateRecords';
import {stripTags, avgWordsPerMin } from '../utils/functions';
import slugify from 'slugify';

const storySchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [5, 'title must be 5 characters or more.'],
    },
    slug: {
        type: String,

    },
    link: {
        type: String,
    },
    content: {
        type: String,
        required: true,
        minlength: [5, 'content must be 5 characters or more.'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isDraft: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cover: {
        required: true,
        type: String
    },
    tags: [String],
    _topic: {
        required: true,
        type: Schema.ObjectId, ref: 'Topic'
    },
    readTime: {
      type: Number
    },
    _creator: {
        required: true,
        type: Schema.ObjectId, ref:'User'
    },
    membersOnly: {
        type: Boolean,
        default: false
    },
    draft: {
        type: Boolean,
        default: false
    },
    _comments: [{ type: Schema.ObjectId, ref:'Comment' }],
    _likes: [{ type: Schema.ObjectId, ref:'Like' }]
}, { toJSON: { virtuals: true }});

storySchema.index({title: 'text', content:'text', tags: 'text'});

// storySchema.statics.paginateRecords =

storySchema.virtual('commentsCount').get(function () {
    const commentsCount = this._comments.length;
    this._comments = [];
    return commentsCount;
});

storySchema.virtual('likesCount').get(function () {
    const likesCount = this._likes.length;
    this._likes = [];
    return likesCount;
});

const autoPopulate = function (next) {
    this.where({isDeleted: false})
        .populate({
        path: '_creator',
        select: 'thumbnail username firstName lastName _id'
    }).populate({
        path: '_topic',
        select: 'name'
    });
    next()
};

storySchema.plugin(mongoosePaginate);

storySchema.plugin(paginateRecords);

storySchema.pre('save', function (next) {
    const story = this;
    story.slug = slugify(story.title);
    story.readTime = avgWordsPerMin(stripTags(story.content));
    next();
});

storySchema.pre('findOne', autoPopulate);

storySchema.pre('find', autoPopulate);

const Story = mongoose.model('Post', storySchema);

export default Story;
