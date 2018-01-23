import mongoose , { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import paginateRecords from '../plugins/paginateRecords';
import { avgWordsPerMin } from '../utils/functions';
import slugify from 'slugify';
import arslugify from 'arslugify';

const storySchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [8, 'Title at least 8 characters or more.'],
        maxlength: [100, 'Title exceeds 100 characters'],
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'description at least 20 characters or more.'],
        maxlength: [240, 'description exceeds 240 characters'],
        trim: true
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
        type: Schema.ObjectId,
        ref: 'Topic',
        required: true,
    },
    count: {
        type: Number
    },
    readTime: {
        type: Number,
        default: 1
    },
    _creator: {
        required: true,
        type: Schema.ObjectId, ref:'User'
    },
    membersOnly: {
        type: Boolean,
        default: false
    },
    _comments: [{ type: Schema.ObjectId, ref:'Response' }],
    _likes: [{ type: Schema.ObjectId, ref:'Like' }]
}, { toJSON: { virtuals: true }});

storySchema.index({title: 'text', content:'text', tags: 'text'});

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
        select: 'name slug _id'
    });
    next()
};

storySchema.plugin(mongoosePaginate);

storySchema.plugin(paginateRecords);

storySchema.pre('save', async function (next) {
    const story = this;
    try {
        const generatedSlug = await story.generateUniqueSlug(story.title);
        story.slug = generatedSlug;
        story.readTime = avgWordsPerMin(story.count);
        next();
    } catch (err) {
        next(err);
    }

});

storySchema.pre('findOneAndUpdate', function (next) {
    const story = this;
    console.log('sstoryyy ', story.count)
    story.readTime = avgWordsPerMin(story.count);
    next();
});

storySchema.pre('findOne', autoPopulate);
storySchema.pre('find', autoPopulate);

storySchema.methods.generateUniqueSlug = async function (title) {
    const Story =  mongoose.model('Story');
    let slug = slugify(title);
    if(!slug) slug = arslugify(title); // for other languages like arabic
    return new Promise( async (resolve, reject) => {
        const generate = async slug => {
            const exists = await Story.findOne({ slug });
            if(exists !== null) {
                generate(`${slug}-${Math.floor(Math.random()*10 + 1)}`)
            } else {
                resolve(slug)
            }
        };
        try {
            generate(slug.toLowerCase())
        } catch (err) {
            reject(err)
        }
    });
};

const Story = mongoose.model('Story', storySchema);

export default Story;
