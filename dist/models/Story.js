'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _paginateRecords = require('../plugins/paginateRecords');

var _paginateRecords2 = _interopRequireDefault(_paginateRecords);

var _functions = require('../utils/functions');

var _slugify = require('slugify');

var _slugify2 = _interopRequireDefault(_slugify);

var _arslugify = require('arslugify');

var _arslugify2 = _interopRequireDefault(_arslugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var storySchema = new _mongoose.Schema({
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
        minlength: [5, 'content must be 5 characters or more.']
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
        type: _mongoose.Schema.ObjectId,
        ref: 'Topic',
        required: true
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
        type: _mongoose.Schema.ObjectId, ref: 'User'
    },
    membersOnly: {
        type: Boolean,
        default: false
    },
    _comments: [{ type: _mongoose.Schema.ObjectId, ref: 'Response' }],
    _likes: [{ type: _mongoose.Schema.ObjectId, ref: 'Like' }]
}, { toJSON: { virtuals: true } });

storySchema.index({ title: 'text', content: 'text', tags: 'text' });

storySchema.virtual('commentsCount').get(function () {
    var commentsCount = this._comments.length;
    this._comments = [];
    return commentsCount;
});

storySchema.virtual('likesCount').get(function () {
    var likesCount = this._likes.length;
    this._likes = [];
    return likesCount;
});

var autoPopulate = function autoPopulate(next) {
    this.where({ isDeleted: false }).populate({
        path: '_creator',
        select: 'thumbnail username firstName lastName _id'
    }).populate({
        path: '_topic',
        select: 'name slug _id'
    });
    next();
};

storySchema.plugin(_mongoosePaginate2.default);

storySchema.plugin(_paginateRecords2.default);

storySchema.pre('save', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(next) {
        var story, generatedSlug;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        story = this;
                        _context.prev = 1;
                        _context.next = 4;
                        return story.generateUniqueSlug(story.title);

                    case 4:
                        generatedSlug = _context.sent;

                        story.slug = generatedSlug;
                        story.readTime = (0, _functions.avgWordsPerMin)(story.count);
                        next();
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](1);

                        next(_context.t0);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 10]]);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

storySchema.pre('findOneAndUpdate', function (next) {
    var story = this;
    console.log('sstoryyy ', story.count);
    story.readTime = (0, _functions.avgWordsPerMin)(story.count);
    next();
});

storySchema.pre('findOne', autoPopulate);
storySchema.pre('find', autoPopulate);

storySchema.methods.generateUniqueSlug = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(title) {
        var _this = this;

        var Story, slug;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        Story = _mongoose2.default.model('Story');
                        slug = (0, _slugify2.default)(title);

                        if (!slug) slug = (0, _arslugify2.default)(title); // for other languages like arabic
                        return _context4.abrupt('return', new Promise(function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(resolve, reject) {
                                var generate;
                                return _regenerator2.default.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                generate = function () {
                                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(slug) {
                                                        var exists;
                                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                            while (1) {
                                                                switch (_context2.prev = _context2.next) {
                                                                    case 0:
                                                                        _context2.next = 2;
                                                                        return Story.findOne({ slug: slug });

                                                                    case 2:
                                                                        exists = _context2.sent;

                                                                        if (exists !== null) {
                                                                            generate(slug + '-' + Math.floor(Math.random() * 10 + 1));
                                                                        } else {
                                                                            resolve(slug);
                                                                        }

                                                                    case 4:
                                                                    case 'end':
                                                                        return _context2.stop();
                                                                }
                                                            }
                                                        }, _callee2, _this);
                                                    }));

                                                    return function generate(_x5) {
                                                        return _ref4.apply(this, arguments);
                                                    };
                                                }();

                                                try {
                                                    generate(slug.toLowerCase());
                                                } catch (err) {
                                                    reject(err);
                                                }

                                            case 2:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this);
                            }));

                            return function (_x3, _x4) {
                                return _ref3.apply(this, arguments);
                            };
                        }()));

                    case 4:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function (_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var Story = _mongoose2.default.model('Story', storySchema);

exports.default = Story;
//# sourceMappingURL=Story.js.map