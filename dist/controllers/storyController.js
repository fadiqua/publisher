"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _index = require("../models/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var storyController = {};

var storyFields = {
    "title": 1,
    "slug": 1,
    "content": 1,
    "_creator": 1,
    "_topic": 1,
    "isDeleted": 1,
    "_comments": 1,
    "createdAt": 1,
    "cover": 1,
    "_likes": 1
};

storyController.post = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, title, description, content, count, tags, cover, topicId, membersOnly, story, newStory, _ref2, _ref3, ns;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body, title = _req$body.title, description = _req$body.description, content = _req$body.content, count = _req$body.count, tags = _req$body.tags, cover = _req$body.cover, topicId = _req$body.topicId, membersOnly = _req$body.membersOnly;
                        _context.prev = 1;

                        if (!(!title || title.length < 8 || title.length > 100)) {
                            _context.next = 6;
                            break;
                        }

                        throw new Error('Title must be between 8 and 100 characters.');

                    case 6:
                        if (!(!description || description.length < 20 || description.length > 240)) {
                            _context.next = 10;
                            break;
                        }

                        throw new Error('Description must be between 20 and 240 characters.');

                    case 10:
                        if (!(!content || content.length < 5)) {
                            _context.next = 14;
                            break;
                        }

                        throw new Error('Content must be between 20 and 240 characters.');

                    case 14:
                        if (cover) {
                            _context.next = 18;
                            break;
                        }

                        throw new Error('Cover is required');

                    case 18:
                        if (!(!tags || !tags.length)) {
                            _context.next = 22;
                            break;
                        }

                        throw new Error('Tags is required');

                    case 22:
                        if (topicId) {
                            _context.next = 24;
                            break;
                        }

                        throw new Error('Topic is missing');

                    case 24:
                        // end validation
                        story = new _index2.default.Story({
                            title: title, content: content, count: count,
                            tags: tags, cover: cover, description: description,
                            membersOnly: membersOnly,
                            _topic: topicId,
                            _creator: req.user.id
                        });
                        _context.next = 27;
                        return story.save();

                    case 27:
                        newStory = _context.sent;
                        _context.next = 30;
                        return Promise.all([_index2.default.Story.populate(newStory, {
                            path: '_topic',
                            select: '-_id -icon'
                        }), _index2.default.User.findByIdAndUpdate(req.user.id, { draft: null })]);

                    case 30:
                        _ref2 = _context.sent;
                        _ref3 = _slicedToArray(_ref2, 1);
                        ns = _ref3[0];

                        res.status(201).json({
                            success: true,
                            story: ns
                        });
                        _context.next = 39;
                        break;

                    case 36:
                        _context.prev = 36;
                        _context.t0 = _context["catch"](1);

                        res.status(500).json({
                            success: false,
                            message: _context.t0.message
                        });

                    case 39:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 36]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

storyController.get = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var user, slug, story;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        user = req.user;
                        _context2.prev = 1;
                        slug = req.params.slug;
                        _context2.next = 5;
                        return _index2.default.Story.findOne({ slug: slug });

                    case 5:
                        _context2.t0 = { virtuals: true };
                        story = _context2.sent.toObject(_context2.t0);

                        story.isUserLiked = false;
                        if (user) {
                            story.isUserLiked = !!story._likes.find(function (id) {
                                return id.toString() === user.id;
                            });
                        }
                        story.isOwner = user && user.id == story._creator._id;
                        res.status(200).json({
                            success: true,
                            story: story
                        });
                        _context2.next = 16;
                        break;

                    case 13:
                        _context2.prev = 13;
                        _context2.t1 = _context2["catch"](1);

                        res.status(500).json({
                            success: false,
                            error: _context2.t1.message
                        });

                    case 16:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 13]]);
    }));

    return function (_x3, _x4) {
        return _ref4.apply(this, arguments);
    };
}();

storyController.updateStory = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var _req$body2, id, story, updatedStory;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _req$body2 = req.body, id = _req$body2.id, story = _req$body2.story;
                        _context3.prev = 1;
                        _context3.next = 4;
                        return _index2.default.Story.findOneAndUpdate({
                            _id: id,
                            _creator: req.user.id
                        }, story, { new: true }).populate('_topic');

                    case 4:
                        updatedStory = _context3.sent;

                        if (updatedStory) {
                            _context3.next = 7;
                            break;
                        }

                        throw new Error("Maybe the story is deleted or you aren\'t the owner or Poor connection");

                    case 7:
                        res.status(201).json({
                            success: true,
                            story: updatedStory
                        });
                        _context3.next = 13;
                        break;

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3["catch"](1);

                        res.status(500).send({
                            success: false,
                            message: _context3.t0.message
                        });

                    case 13:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 10]]);
    }));

    return function (_x5, _x6) {
        return _ref5.apply(this, arguments);
    };
}();

storyController.deleteStory = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var id, deletedStory;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = req.query.id;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return _index2.default.Story.findOneAndUpdate({ _id: id, _creator: req.user.id }, { isDeleted: true });

                    case 4:
                        deletedStory = _context4.sent;

                        if (deletedStory) {
                            _context4.next = 7;
                            break;
                        }

                        throw new Error("You don't have a permission");

                    case 7:

                        res.status(200).send({
                            success: true
                        });
                        _context4.next = 13;
                        break;

                    case 10:
                        _context4.prev = 10;
                        _context4.t0 = _context4["catch"](1);

                        res.status(500).send({
                            message: _context4.t0.message
                        });

                    case 13:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[1, 10]]);
    }));

    return function (_x7, _x8) {
        return _ref6.apply(this, arguments);
    };
}();

storyController.getById = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var id, story;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        id = req.params.id;
                        _context5.next = 4;
                        return _index2.default.Story.findById(id);

                    case 4:
                        story = _context5.sent;

                        res.status(200).json({
                            success: true,
                            story: story
                        });
                        _context5.next = 11;
                        break;

                    case 8:
                        _context5.prev = 8;
                        _context5.t0 = _context5["catch"](0);

                        res.status(500).json({
                            success: false,
                            error: _context5.t0.message
                        });

                    case 11:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 8]]);
    }));

    return function (_x9, _x10) {
        return _ref7.apply(this, arguments);
    };
}();

storyController.getAll = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var stories;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return _index2.default.Story.find({}).populate({
                            path: '_creator',
                            select: 'username -_id'

                        });

                    case 3:
                        stories = _context6.sent;

                        res.status(200).json({
                            success: true,
                            data: stories
                        });
                        _context6.next = 10;
                        break;

                    case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6["catch"](0);

                        res.status(500).json({
                            success: false
                        });

                    case 10:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 7]]);
    }));

    return function (_x11, _x12) {
        return _ref8.apply(this, arguments);
    };
}();

storyController.getHomePageData = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        var topics, params, data;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return _index2.default.Topic.find({});

                    case 2:
                        topics = _context7.sent;
                        params = {};

                        if (!req.user) {
                            params["membersOnly"] = false;
                        }
                        _context7.next = 7;
                        return Promise.all(topics.map(function (topic) {
                            return _index2.default.Story.find(Object.assign({ _topic: topic._id }, params)).sort({ createdAt: 1 }).limit(4);
                        }));

                    case 7:
                        _context7.t0 = function (t) {
                            return t.length > 0;
                        };

                        data = _context7.sent.filter(_context7.t0);

                        res.status(200).send({
                            stories: data
                        });

                    case 10:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x13, _x14) {
        return _ref9.apply(this, arguments);
    };
}();

storyController.getStoriesByTopic = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
        var _req$query, topic, _req$query$page, page, sortby, stories, pageSize, params, topicObj, sortBy, sort, aggregate, _stories;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _req$query = req.query, topic = _req$query.topic, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 1 : _req$query$page, sortby = _req$query.sortby;
                        stories = void 0;
                        pageSize = 9;
                        params = {};

                        params['isDeleted'] = false;
                        if (!req.user) {
                            params['membersOnly'] = false;
                        }
                        _context8.next = 8;
                        return _index2.default.Topic.findOne({ slug: topic });

                    case 8:
                        topicObj = _context8.sent;
                        sortBy = sortby || 'date';
                        sort = {};

                        if (sortBy === 'date') {
                            sort['createdAt'] = 1;
                        } else {
                            sort["commentsCount"] = -1;
                            sort["likesCount"] = -1;
                            sort['createdAt'] = 1;
                        }
                        aggregate = _index2.default.Story.aggregate();

                        if (!(topicObj !== null)) {
                            _context8.next = 21;
                            break;
                        }

                        params['_topic'] = topicObj._id;
                        _context8.next = 17;
                        return _index2.default.Story.paginateRecords(aggregate, {
                            match: params,
                            project: Object.assign({}, storyFields, {
                                "commentsCount": { "$size": "$_comments" },
                                "likesCount": { "$size": "$_likes" }
                            }),
                            sort: sort,
                            page: page,
                            pageSize: pageSize
                        }, ['_creator', '_topic']);

                    case 17:
                        _stories = _context8.sent;

                        res.status(200).json({
                            success: true,
                            stories: _stories
                        });
                        _context8.next = 33;
                        break;

                    case 21:
                        if (!(topic === 'members-only')) {
                            _context8.next = 32;
                            break;
                        }

                        if (req.user) {
                            _context8.next = 26;
                            break;
                        }

                        res.status(401).json({
                            success: false,
                            error: 'Authentication is not provided'
                        });
                        _context8.next = 30;
                        break;

                    case 26:
                        _context8.next = 28;
                        return _index2.default.Story.paginateRecords(aggregate, {
                            match: params,
                            project: Object.assign({}, storyFields, {
                                "commentsCount": { "$size": "$_comments" },
                                "likesCount": { "$size": "$_likes" }
                            }),
                            sort: sort,
                            page: page,
                            pageSize: pageSize
                        }, ['_creator', '_topic']);

                    case 28:
                        stories = _context8.sent;

                        res.status(200).json({
                            success: true,
                            stories: stories
                        });

                    case 30:
                        _context8.next = 33;
                        break;

                    case 32:
                        res.status(500).json({
                            success: false,
                            error: 'Not valid topic'
                        });

                    case 33:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function (_x15, _x16) {
        return _ref10.apply(this, arguments);
    };
}();

storyController.getPopularStories = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
        var page, pageSize, aggregate, data;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        page = req.query.page;
                        pageSize = 9;
                        aggregate = _index2.default.Story.aggregate();
                        _context9.next = 5;
                        return _index2.default.Story.paginateRecords(aggregate, {
                            match: { "isDeleted": false },
                            project: Object.assign({}, storyFields, {
                                "commentsCount": { "$size": "$_comments" },
                                "likesCount": { "$size": "$_likes" }
                            }),
                            sort: { "commentsCount": -1, "likesCount": -1, "createdAt": 1 },
                            page: page,
                            pageSize: pageSize
                        }, ['_creator', '_topic']);

                    case 5:
                        data = _context9.sent;

                        res.status(200).json({
                            success: true,
                            stories: data

                        });

                    case 7:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function (_x17, _x18) {
        return _ref11.apply(this, arguments);
    };
}();

storyController.getStoriesByTag = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
        var _req$params$tag, tag, _req$query$page2, page, regex, params, stories;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _req$params$tag = req.params.tag, tag = _req$params$tag === undefined ? '' : _req$params$tag;
                        _req$query$page2 = req.query.page, page = _req$query$page2 === undefined ? 1 : _req$query$page2;
                        // const regex = new RegExp(`/(^|\W)${tag}($|\W)/i`);

                        regex = new RegExp("^" + tag + "\\s?");
                        // db.tags.aggregate(
                        //     {$unwind:"$tags"},
                        //     {$group: { _id:"$tags", score:{"$sum":1} } },
                        //     {$out:"tagStats"}
                        // )

                        params = {};

                        params['isDeleted'] = false;
                        if (!req.user.id) params['membersOnly'] = true;
                        _context10.next = 8;
                        return _index2.default.Story.paginate(Object.assign({}, params, {
                            tags: {
                                $in: [regex]
                            }
                        }), {
                            sort: {
                                createdAt: -1
                            },
                            page: page,
                            limit: 10
                        });

                    case 8:
                        stories = _context10.sent;


                        res.status(200).json({
                            stories: stories
                        });

                    case 10:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, undefined);
    }));

    return function (_x19, _x20) {
        return _ref12.apply(this, arguments);
    };
}();

exports.default = storyController;
//# sourceMappingURL=storyController.js.map