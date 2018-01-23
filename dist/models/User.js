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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var userSchema = new _mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, 'Username must be 5 characters or more.']
    },
    firstName: String,
    lastName: String,
    thumbnail: String,
    picture: String,
    bio: String,
    permission: {
        type: String,
        default: 'writer'
    },
    draft: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    _following: [{ type: _mongoose.Schema.ObjectId, ref: 'User' }],
    _followers: [{ type: _mongoose.Schema.ObjectId, ref: 'User' }]
}, { toJSON: { virtuals: true } });

userSchema.index({ username: 'text', firstName: 'text', lastName: 'text', email: 'text' });

userSchema.plugin(_mongoosePaginate2.default);

userSchema.virtual('displayName').get(function () {
    return this.firstName + ' ' + this.lastName;
});
userSchema.statics.generateUniqueUserName = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref) {
        var _this = this;

        var firstName = _ref.firstName,
            lastName = _ref.lastName;
        var User, username;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        User = this;
                        username = firstName.toLowerCase() + '.' + lastName.toLowerCase();
                        return _context3.abrupt('return', new Promise(function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve, reject) {
                                var generate;
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                generate = function () {
                                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(username) {
                                                        var exists;
                                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                                            while (1) {
                                                                switch (_context.prev = _context.next) {
                                                                    case 0:
                                                                        _context.next = 2;
                                                                        return User.findOne({ username: username });

                                                                    case 2:
                                                                        exists = _context.sent;

                                                                        if (exists !== null) {
                                                                            generate(username + '.' + Math.floor(Math.random() * 10 + 1));
                                                                        } else {
                                                                            resolve(username);
                                                                        }

                                                                    case 4:
                                                                    case 'end':
                                                                        return _context.stop();
                                                                }
                                                            }
                                                        }, _callee, _this);
                                                    }));

                                                    return function generate(_x4) {
                                                        return _ref4.apply(this, arguments);
                                                    };
                                                }();

                                                try {
                                                    generate(username);
                                                } catch (err) {
                                                    reject(err);
                                                }

                                            case 2:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this);
                            }));

                            return function (_x2, _x3) {
                                return _ref3.apply(this, arguments);
                            };
                        }()));

                    case 3:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function (_x) {
        return _ref2.apply(this, arguments);
    };
}();

var User = _mongoose2.default.model('User', userSchema);

exports.default = User;
//# sourceMappingURL=User.js.map