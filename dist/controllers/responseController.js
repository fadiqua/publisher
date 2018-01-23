'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var commentController = {};

commentController.post = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, text, storyId, userId, parentId, comment, newComment, result, c;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body, text = _req$body.text, storyId = _req$body.storyId, userId = _req$body.userId, parentId = _req$body.parentId;
                        comment = new _index2.default.Response({
                            text: text,
                            _story: storyId,
                            _creator: userId,
                            _parent: parentId || null
                        });
                        _context.prev = 2;
                        _context.next = 5;
                        return comment.save();

                    case 5:
                        newComment = _context.sent;

                        if (!(parentId == undefined)) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 9;
                        return Promise.all([_index2.default.Story.findByIdAndUpdate(storyId, { $push: { '_comments': newComment._id } }), _index2.default.Response.populate(newComment, {
                            path: "_creator",
                            select: '-password -createdAt -facebook'
                        })]);

                    case 9:
                        result = _context.sent;

                        if (!(userId !== result[0]._creator.toString())) {
                            _context.next = 13;
                            break;
                        }

                        _context.next = 13;
                        return new _index2.default.Notifications({
                            _from: userId,
                            _to: result[0]._creator,
                            type: 'comment',
                            _parentTarget: result[0]._id,
                            _target: result[1]._id
                        }).save();

                    case 13:
                        _context.next = 18;
                        break;

                    case 15:
                        console.log('parentId ', parentId);
                        _context.next = 18;
                        return _index2.default.Response.findByIdAndUpdate(parentId, { $inc: { repliesCount: 1 } });

                    case 18:
                        _context.next = 20;
                        return _index2.default.Response.populate(newComment, {
                            path: '_creator',
                            select: '-_following -_followers -facebook -google'
                        });

                    case 20:
                        c = _context.sent;

                        res.status(200).json({
                            success: true,
                            comment: c
                        });
                        _context.next = 27;
                        break;

                    case 24:
                        _context.prev = 24;
                        _context.t0 = _context['catch'](2);

                        res.status(500).json({
                            success: false,
                            error: _context.t0.message
                        });

                    case 27:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 24]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

commentController.get = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var storyId, page, comments;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        storyId = req.params.storyId;
                        page = req.query.page;
                        // console.log('storyId ', storyId);

                        _context2.prev = 2;
                        _context2.next = 5;
                        return _index2.default.Response.paginate({
                            _story: storyId,
                            isDeleted: false,
                            _parent: null
                        }, {
                            sort: {
                                createdAt: -1
                            },
                            populate: '_story',
                            page: page || 1,
                            limit: 2
                        });

                    case 5:
                        comments = _context2.sent;

                        res.status(200).json(Object.assign({}, comments));
                        _context2.next = 12;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](2);

                        res.status(500).json({
                            success: false,
                            error: _context2.t0.message
                        });

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[2, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

commentController.delete = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var _req$query, id, storyId, parentId, promises;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _req$query = req.query, id = _req$query.id, storyId = _req$query.storyId, parentId = _req$query.parentId;
                        _context3.prev = 1;
                        promises = [_index2.default.Response.findByIdAndUpdate(id, {
                            isDeleted: true
                        }), _index2.default.Story.findByIdAndUpdate(storyId, { $pull: { _comments: id } })];

                        if (parentId) {
                            promises.push(_index2.default.Response.findByIdAndUpdate(parentId, { $inc: { repliesCount: -1 } }));
                        }
                        _context3.next = 6;
                        return Promise.all(promises);

                    case 6:
                        res.status(200).send({
                            success: true
                        });
                        _context3.next = 12;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](1);

                        res.status(500).send({
                            success: false,
                            error: _context3.t0.message
                        });

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 9]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
commentController.update = function (req, res) {
    var _req$body2 = req.body,
        id = _req$body2.id,
        text = _req$body2.text;

    if (id && text) {
        _index2.default.Response.findByIdAndUpdate(id, { text: text }).then(function (comment) {
            res.status(200).json({
                success: true,
                comment: comment
            });
        }).catch(function (error) {
            res.status(500).send({
                success: false,
                error: error
            });
        });
    } else {
        res.status(500).send({
            success: false,
            error: 'no comment id and comment creator.'
        });
    }
};

commentController.getUserResponses = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var username, page, user, responses;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        username = req.params.username;
                        page = req.query.page;
                        _context4.prev = 2;
                        _context4.next = 5;
                        return _index2.default.User.findOne({ username: username });

                    case 5:
                        user = _context4.sent;
                        _context4.next = 8;
                        return _index2.default.Response.paginate({
                            _creator: user._id,
                            isDeleted: false
                        }, {
                            sort: {
                                createdAt: -1
                            },
                            populate: '_story',
                            page: page || 1,
                            limit: 6
                        });

                    case 8:
                        responses = _context4.sent;

                        res.status(200).json(Object.assign({}, responses));
                        _context4.next = 15;
                        break;

                    case 12:
                        _context4.prev = 12;
                        _context4.t0 = _context4['catch'](2);

                        res.status(500).json({
                            success: false,
                            error: _context4.t0.message
                        });

                    case 15:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[2, 12]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

commentController.getReponseById = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var responseId, response;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        responseId = req.params.responseId;
                        _context5.next = 4;
                        return _index2.default.Response.findById(responseId).populate({
                            path: '_creator',
                            select: 'thumbnail username firstName lastName _id'
                        });

                    case 4:
                        response = _context5.sent;

                        res.status(200).json({
                            response: response
                        });
                        _context5.next = 11;
                        break;

                    case 8:
                        _context5.prev = 8;
                        _context5.t0 = _context5['catch'](0);

                        res.status(500).send({
                            error: _context5.t0.message
                        });

                    case 11:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 8]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
commentController.getReplies = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var responseId, page, response;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        responseId = req.params.responseId;
                        page = req.query.page;
                        _context6.next = 5;
                        return _index2.default.Response.paginate({
                            _parent: responseId,
                            isDeleted: false
                        }, {
                            sort: {
                                createdAt: -1
                            },
                            populate: '_story',
                            page: page || 1,
                            limit: 6
                        });

                    case 5:
                        response = _context6.sent;

                        res.status(200).json(Object.assign({}, response));
                        _context6.next = 12;
                        break;

                    case 9:
                        _context6.prev = 9;
                        _context6.t0 = _context6['catch'](0);

                        res.status(500).send({
                            error: _context6.t0.message
                        });

                    case 12:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 9]]);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();
exports.default = commentController;
//# sourceMappingURL=responseController.js.map