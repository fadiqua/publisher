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

var notificationsController = {};

notificationsController.markNotificationAsRead = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var id;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        id = req.body.id;
                        _context.prev = 1;

                        if (!id) {
                            _context.next = 8;
                            break;
                        }

                        _context.next = 5;
                        return _index2.default.Notifications.findByIdAndUpdate(id, { isClicked: true });

                    case 5:
                        res.status(200).json({
                            success: true
                        });
                        _context.next = 11;
                        break;

                    case 8:
                        _context.next = 10;
                        return _index2.default.Notifications.update({ isClicked: false }, {
                            isClicked: true,
                            isRead: true
                        }, { multiple: true });

                    case 10:
                        res.status(200).json({
                            success: true
                        });

                    case 11:
                        _context.next = 16;
                        break;

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](1);

                        res.status(500).send({
                            success: false,
                            error: _context.t0
                        });

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 13]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
notificationsController.clearUnreadBadgeCount = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _index2.default.Notifications.update({ _to: req.user.id, isRead: false }, { $set: { isRead: true } }, { multi: true });

                    case 3:
                        res.status(200).json({
                            success: true
                        });
                        _context2.next = 9;
                        break;

                    case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2['catch'](0);

                        res.status(500).send({
                            success: false
                        });

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 6]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
notificationsController.getUnreadCount = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {
                            // const count = await db.Notifications.find({ _to: req.user.id, isRead: false }).count();
                            res.status(200).json({
                                success: true,
                                count: 0
                            });
                        } catch (e) {
                            res.status(500).json({
                                success: true
                            });
                        }

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

notificationsController.getNotifications = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var page, notifications;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        page = req.query.page;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return _index2.default.Notifications.paginate({ _to: req.user.id }, { sort: { createdAt: -1 }, page: page || 1, limit: 12 });

                    case 4:
                        notifications = _context4.sent;

                        res.status(200).json(Object.assign({}, notifications));
                        _context4.next = 11;
                        break;

                    case 8:
                        _context4.prev = 8;
                        _context4.t0 = _context4['catch'](1);

                        res.status(500).json({
                            success: false
                        });

                    case 11:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[1, 8]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

notificationsController.getNotificationById = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var id, notification;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        id = req.params.id;
                        _context5.next = 4;
                        return _index2.default.Notifications.findById(id);

                    case 4:
                        notification = _context5.sent;

                        if (!(req.user.id !== notification._to.toString())) {
                            _context5.next = 7;
                            break;
                        }

                        throw new Error('invalid notification id');

                    case 7:
                        res.status(200).json({
                            success: true,
                            notification: notification
                        });
                        _context5.next = 13;
                        break;

                    case 10:
                        _context5.prev = 10;
                        _context5.t0 = _context5['catch'](0);

                        res.status(500).send({
                            success: false,
                            error: _context5.t0.message
                        });

                    case 13:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 10]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

exports.default = notificationsController;
//# sourceMappingURL=notificationsController.js.map