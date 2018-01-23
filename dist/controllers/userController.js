'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import request from 'request';
// import io from '../index';

function tokenForUser(user) {
    var timestamp = new Date().getTime();
    return _jsonwebtoken2.default.sign({ sub: user.id, permission: user.permission, iat: timestamp }, _config2.default.jwtSecret);
}

var userController = {};

userController.localSignup = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, firstName, lastName, email, password, emailExists, user, token;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password;
                        // validation - username / password

                        _context.prev = 1;

                        if (firstName) {
                            _context.next = 6;
                            break;
                        }

                        throw new Error('Frist Name is Required');

                    case 6:
                        if (lastName) {
                            _context.next = 10;
                            break;
                        }

                        throw new Error('Last Name is Required');

                    case 10:
                        if (email) {
                            _context.next = 14;
                            break;
                        }

                        throw new Error('Email is Required');

                    case 14:
                        if (!(!password || password.length < 8)) {
                            _context.next = 16;
                            break;
                        }

                        throw new Error('Invalid Password, must be at least 8 characters');

                    case 16:
                        _context.next = 18;
                        return _index2.default.LocalAuth.findOne({ email: email });

                    case 18:
                        emailExists = _context.sent;

                        if (!(emailExists !== null)) {
                            _context.next = 21;
                            break;
                        }

                        throw Error("Email already exists");

                    case 21:
                        _context.next = 23;
                        return _index2.default.LocalAuth.createLocalUser({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: password
                        });

                    case 23:
                        user = _context.sent;
                        token = tokenForUser(user);

                        res.status(200).json({
                            success: true,
                            me: user,
                            token: token
                        });
                        _context.next = 31;
                        break;

                    case 28:
                        _context.prev = 28;
                        _context.t0 = _context['catch'](1);

                        res.status(500).json({
                            success: false,
                            message: _context.t0.message
                        });

                    case 31:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 28]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

userController.login = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var _req$body2, email, password, errorResponse, user;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

                        errorResponse = function errorResponse(msg) {
                            res.status(500).json({
                                success: false,
                                message: msg || 'Invalid credentials'
                            });
                        };

                        _context3.prev = 2;
                        _context3.next = 5;
                        return _index2.default.LocalAuth.findOne({ email: email });

                    case 5:
                        user = _context3.sent;

                        if (!(user === null)) {
                            _context3.next = 9;
                            break;
                        }

                        errorResponse('This Email is not registered in the system');
                        return _context3.abrupt('return');

                    case 9:
                        user.comparePassword(password, function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(err, isMatch) {
                                var me, token;
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                if (!(err || !isMatch)) {
                                                    _context2.next = 3;
                                                    break;
                                                }

                                                errorResponse();
                                                return _context2.abrupt('return');

                                            case 3:
                                                _context2.next = 5;
                                                return _index2.default.User.findById(user.user);

                                            case 5:
                                                me = _context2.sent;
                                                token = tokenForUser(me);

                                                res.status(200).json({
                                                    success: true,
                                                    me: me,
                                                    token: token
                                                });

                                            case 8:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, undefined);
                            }));

                            return function (_x5, _x6) {
                                return _ref3.apply(this, arguments);
                            };
                        }());
                        _context3.next = 15;
                        break;

                    case 12:
                        _context3.prev = 12;
                        _context3.t0 = _context3['catch'](2);
                        return _context3.abrupt('return', errorResponse(_context3.t0.message));

                    case 15:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[2, 12]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

userController.socialLogin = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var _req$body3, network, socialToken, data, user, token;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _req$body3 = req.body, network = _req$body3.network, socialToken = _req$body3.socialToken, data = _req$body3.data;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return _index2.default.SocialAuth.findOrCreate(network, data);

                    case 4:
                        user = _context4.sent;

                        console.log('userr ', user);
                        token = tokenForUser(user);

                        res.status(200).send({
                            success: true,
                            currentUser: user,
                            token: token
                        });
                        _context4.next = 13;
                        break;

                    case 10:
                        _context4.prev = 10;
                        _context4.t0 = _context4['catch'](1);
                        return _context4.abrupt('return', res.status(500).send({
                            success: false,
                            error: _context4.t0.message
                        }));

                    case 13:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[1, 10]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

userController.getUserByUsername = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var username, user, topStories;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        username = req.params.username;
                        _context5.prev = 1;
                        _context5.next = 4;
                        return _index2.default.User.findOne({ username: username });

                    case 4:
                        user = _context5.sent;
                        _context5.next = 7;
                        return _index2.default.Story.find({ _creator: user._id })
                        // .sort({ '_likes.length': -1, '_comments.length': -1 })
                        .limit(3);

                    case 7:
                        topStories = _context5.sent;

                        res.status(200).json({
                            success: true,
                            user: user,
                            topStories: topStories
                        });
                        _context5.next = 14;
                        break;

                    case 11:
                        _context5.prev = 11;
                        _context5.t0 = _context5['catch'](1);

                        res.status(500).json({
                            success: false,
                            error: _context5.t0
                        });

                    case 14:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[1, 11]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

userController.followUser = function (req, res) {
    var user = req.user.id;
    var followedUser = req.body.id;
    console.log('user ', user);
    console.log('followedUser ', followedUser);
    var followObj = new _index2.default.Follow({
        _user: user,
        _followed: followedUser
    });

    _index2.default.Follow.findOne({
        _user: user,
        _followed: followedUser
    }).then(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(result) {
            var targetUser;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            if (!result) {
                                _context6.next = 5;
                                break;
                            }

                            _context6.next = 3;
                            return Promise.all([result.remove(), _index2.default.Notifications.findOneAndRemove({
                                _from: user,
                                _to: followedUser,
                                type: 'follow'
                            })]);

                        case 3:
                            _context6.next = 12;
                            break;

                        case 5:
                            _context6.next = 7;
                            return followObj.save();

                        case 7:
                            _context6.next = 9;
                            return _index2.default.Follow.populate(followObj, {
                                path: '_user',
                                select: ' username firstName lastName displayName thumbnail _id'
                            });

                        case 9:
                            targetUser = _context6.sent;
                            _context6.next = 12;
                            return new _index2.default.Notifications({
                                _from: user,
                                _to: followedUser,
                                type: 'follow'
                            }).save();

                        case 12:
                            res.status(200).json({
                                success: true
                            });

                        case 13:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        }));

        return function (_x11) {
            return _ref6.apply(this, arguments);
        };
    }()).catch(function (error) {
        res.status(500).json({
            success: true,
            error: error
        });
    });
};

userController.getMe = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        var user, me;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        user = req.user;
                        _context7.prev = 1;

                        if (req.user) {
                            _context7.next = 4;
                            break;
                        }

                        throw new Error('');

                    case 4:
                        _context7.next = 6;
                        return _index2.default.User.findById(user.id);

                    case 6:
                        me = _context7.sent;

                        if (me) {
                            _context7.next = 9;
                            break;
                        }

                        throw new Error('Invalid signature');

                    case 9:
                        res.status(200).json({
                            success: true,
                            me: me
                        });
                        _context7.next = 15;
                        break;

                    case 12:
                        _context7.prev = 12;
                        _context7.t0 = _context7['catch'](1);

                        res.status(403).json({
                            success: false,
                            message: _context7.t0.message
                        });

                    case 15:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[1, 12]]);
    }));

    return function (_x12, _x13) {
        return _ref7.apply(this, arguments);
    };
}();

userController.updateProfile = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
        var data, user;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        data = req.body.data;
                        _context8.prev = 1;
                        _context8.next = 4;
                        return _index2.default.User.findByIdAndUpdate(req.user.id, Object.assign({}, data), { new: true });

                    case 4:
                        user = _context8.sent;

                        res.status(200).json({
                            success: true,
                            user: user
                        });
                        _context8.next = 11;
                        break;

                    case 8:
                        _context8.prev = 8;
                        _context8.t0 = _context8['catch'](1);

                        res.status(500).send({
                            error: _context8.t0.message
                        });

                    case 11:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[1, 8]]);
    }));

    return function (_x14, _x15) {
        return _ref8.apply(this, arguments);
    };
}();

userController.getUserStories = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
        var username, page, user, stories;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        username = req.params.username;
                        page = req.query.page;
                        _context9.prev = 2;
                        _context9.next = 5;
                        return _index2.default.User.findOne({ username: username });

                    case 5:
                        user = _context9.sent;
                        _context9.next = 8;
                        return _index2.default.Story.paginate({
                            _creator: user._id,
                            isDeleted: false,
                            membersOnly: false
                        }, {
                            select: '-tags',
                            sort: {
                                createdAt: -1
                            },
                            page: page,
                            limit: 6
                        });

                    case 8:
                        stories = _context9.sent;

                        res.status(200).json(Object.assign({
                            success: true
                        }, stories));
                        _context9.next = 15;
                        break;

                    case 12:
                        _context9.prev = 12;
                        _context9.t0 = _context9['catch'](2);

                        res.status(500).json({
                            error: _context9.t0.message
                        });

                    case 15:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined, [[2, 12]]);
    }));

    return function (_x16, _x17) {
        return _ref9.apply(this, arguments);
    };
}();

userController.getUserResponses = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
        var username, page, user, responses;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        username = req.params.username;
                        page = req.query.page;
                        _context10.prev = 2;
                        _context10.next = 5;
                        return _index2.default.User.findOne({ username: username });

                    case 5:
                        user = _context10.sent;
                        _context10.next = 8;
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
                        responses = _context10.sent;

                        res.status(200).json(Object.assign({
                            success: true
                        }, responses));
                        _context10.next = 15;
                        break;

                    case 12:
                        _context10.prev = 12;
                        _context10.t0 = _context10['catch'](2);

                        res.status(500).json({
                            success: false,
                            error: _context10.t0.message
                        });

                    case 15:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined, [[2, 12]]);
    }));

    return function (_x18, _x19) {
        return _ref10.apply(this, arguments);
    };
}();

userController.getFollowers = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res) {
        var id, page, users;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        id = req.params.id;
                        page = req.query.page;
                        _context11.prev = 2;
                        _context11.next = 5;
                        return _index2.default.Follow.paginate({ _followed: id }, { sort: { createdAt: 1 }, page: page || 1, limit: 6 });

                    case 5:
                        users = _context11.sent;

                        res.status(200).json(Object.assign({}, users));
                        _context11.next = 12;
                        break;

                    case 9:
                        _context11.prev = 9;
                        _context11.t0 = _context11['catch'](2);

                        res.status(500).json({
                            success: false,
                            error: _context11.t0.message
                        });

                    case 12:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, undefined, [[2, 9]]);
    }));

    return function (_x20, _x21) {
        return _ref11.apply(this, arguments);
    };
}();

userController.getFollowings = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res) {
        var id, page, users;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        id = req.params.id;
                        page = req.query.page;
                        _context12.prev = 2;
                        _context12.next = 5;
                        return _index2.default.Follow.paginate({ _user: id }, { sort: { createdAt: 1 }, page: page || 1, limit: 20 });

                    case 5:
                        users = _context12.sent;

                        res.status(200).json(Object.assign({}, users));
                        _context12.next = 12;
                        break;

                    case 9:
                        _context12.prev = 9;
                        _context12.t0 = _context12['catch'](2);

                        res.status(500).json({
                            success: false,
                            error: _context12.t0.message
                        });

                    case 12:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, undefined, [[2, 9]]);
    }));

    return function (_x22, _x23) {
        return _ref12.apply(this, arguments);
    };
}();

exports.default = userController;
//# sourceMappingURL=userController.js.map