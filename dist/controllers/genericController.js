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

var genericController = {};

genericController.search = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var value, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        value = req.query.value;
                        _context.prev = 1;
                        _context.next = 4;
                        return Promise.all([_index2.default.Story.find({ isDeleted: false, isDraft: false, $text: { $search: value } }).limit(6), _index2.default.User.find({ $text: { $search: value } }).limit(4)]);

                    case 4:
                        result = _context.sent;

                        res.status(200).json({
                            success: true,
                            stories: result[0],
                            users: result[1]
                        });
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](1);

                        res.status(500).json({
                            success: false,
                            error: _context.t0.message
                        });

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 8]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
genericController.advancedSearch = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var _req$query, q, page, Model, data;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _req$query = req.query, q = _req$query.q, page = _req$query.page;
                        Model = Object.keys(req.query).indexOf('users') !== -1 ? 'User' : 'Story';

                        console.log(Model);
                        _context2.next = 6;
                        return _index2.default[Model].paginate({ $text: { $search: q } }, {
                            select: '-tags',
                            sort: {
                                createdAt: 1
                            },
                            page: page,
                            limit: 6
                        });

                    case 6:
                        data = _context2.sent;

                        res.status(200).json(Object.assign({}, data));_context2.next = 13;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](0);

                        res.send(500).json({
                            success: false,
                            error: _context2.t0.message
                        });

                    case 13:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 10]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
exports.default = genericController;
//# sourceMappingURL=genericController.js.map