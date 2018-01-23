'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var likeController = {};
likeController.post = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, id, type, parent, obj, like, story, storyObj;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body, id = _req$body.id, type = _req$body.type, parent = _req$body.parent;
                        _context.next = 3;
                        return _index2.default.Like.findOne({
                            _creator: req.user.id,
                            _object: id, type: type
                        });

                    case 3:
                        obj = _context.sent;

                        if (obj) {
                            _context.next = 17;
                            break;
                        }

                        like = new _index2.default.Like({
                            _creator: req.user.id, _object: id, type: type, parent: parent || null
                        });
                        _context.next = 8;
                        return like.save();

                    case 8:
                        _context.next = 10;
                        return _index2.default[type].findByIdAndUpdate(id, { $push: { '_likes': req.user.id } });

                    case 10:
                        story = _context.sent;

                        if (!(req.user.id !== story._creator)) {
                            _context.next = 14;
                            break;
                        }

                        _context.next = 14;
                        return new _index2.default.Notifications({
                            _from: req.user.id,
                            _to: story._creator,
                            type: 'like',
                            _parentTarget: story._id,
                            _target: null
                        }).save();

                    case 14:

                        res.status(200).json({
                            isLiked: true,
                            user: req.user.id
                        });
                        _context.next = 25;
                        break;

                    case 17:
                        _context.next = 19;
                        return obj.remove();

                    case 19:
                        _context.next = 21;
                        return _index2.default[type].findByIdAndUpdate(id, { $pull: { '_likes': req.user.id } });

                    case 21:
                        storyObj = _context.sent;
                        _context.next = 24;
                        return _index2.default.Notifications.findOneAndRemove({
                            _from: req.user.id,
                            _to: storyObj._creator,
                            type: 'like',
                            _parentTarget: id
                        });

                    case 24:

                        res.status(200).json({
                            isLiked: false,
                            user: req.user.id
                        });

                    case 25:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = likeController;
//# sourceMappingURL=likeController.js.map