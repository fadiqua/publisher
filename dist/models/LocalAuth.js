'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var localAuthSchema = new _mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String,
        minlength: [8, 'Password must be 5 characters or more.']
    },
    user: { type: _mongoose.Schema.ObjectId, ref: 'User' }
});

// Write encryption for Password
/**
 * The pre-save hook method.
 */
// On save hook, encrypt password
localAuthSchema.pre('save', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(next) {
        var user, salt, hash;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = this;
                        _context.prev = 1;
                        _context.next = 4;
                        return (0, _services.generateSalt)(user.password);

                    case 4:
                        salt = _context.sent;
                        _context.next = 7;
                        return _bcrypt2.default.hash(user.password, salt);

                    case 7:
                        hash = _context.sent;

                        user.password = hash;
                        next();

                        _context.next = 15;
                        break;

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](1);

                        next(_context.t0);

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 12]]);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

// compare password when local login 
localAuthSchema.methods.comparePassword = function (condidatePassword, callback) {
    _bcrypt2.default.compare(condidatePassword, this.password, function (err, isMatch) {
        if (err) callback(err);
        callback(null, isMatch);
    });
};

localAuthSchema.statics.createLocalUser = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref2) {
        var _this = this;

        var firstName = _ref2.firstName,
            lastName = _ref2.lastName,
            password = _ref2.password,
            email = _ref2.email;
        var localObj, UserModel, userObj;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        localObj = new this({ email: email, password: password });
                        UserModel = _mongoose2.default.model('User');
                        userObj = new UserModel();
                        return _context3.abrupt('return', new Promise(function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve, reject) {
                                var username, newUser;
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _context2.prev = 0;
                                                _context2.next = 3;
                                                return UserModel.generateUniqueUserName({ firstName: firstName, lastName: lastName });

                                            case 3:
                                                username = _context2.sent;

                                                userObj['username'] = username;
                                                userObj['firstName'] = firstName;
                                                userObj['lastName'] = lastName;
                                                _context2.next = 9;
                                                return userObj.save();

                                            case 9:
                                                newUser = _context2.sent;

                                                localObj['user'] = newUser._id;
                                                _context2.next = 13;
                                                return localObj.save();

                                            case 13:
                                                resolve(newUser);
                                                _context2.next = 19;
                                                break;

                                            case 16:
                                                _context2.prev = 16;
                                                _context2.t0 = _context2['catch'](0);

                                                reject(_context2.t0);

                                            case 19:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this, [[0, 16]]);
                            }));

                            return function (_x3, _x4) {
                                return _ref4.apply(this, arguments);
                            };
                        }()));

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function (_x2) {
        return _ref3.apply(this, arguments);
    };
}();

var LocalAuth = _mongoose2.default.model('localAuth', localAuthSchema);

exports.default = LocalAuth;
//# sourceMappingURL=LocalAuth.js.map