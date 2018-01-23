'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _functions = require('../utils/functions');

var _imageDownloader = require('image-downloader');

var _imageDownloader2 = _interopRequireDefault(_imageDownloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var socialAuthSchema = new _mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    user: { type: _mongoose.Schema.ObjectId, ref: 'User' }
});

socialAuthSchema.statics.findOrCreate = function (network, data) {
    var _this = this;

    var socialObj = new this();
    var UserModel = _mongoose2.default.model('User');
    var userObj = new UserModel();
    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve, reject) {
            var user, firstName, lastName, username, thumbnailName, _ref2, filename, image, pictureName, _ref3, _filename, _image, _pictureName, _ref4, _filename2, _image2, newUser, existsUser;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return _this.findOne({ provider: network, providerId: data.id });

                        case 3:
                            user = _context.sent;

                            if (user) {
                                _context.next = 52;
                                break;
                            }

                            socialObj['providerId'] = data.id;
                            socialObj['provider'] = network;
                            firstName = data.first_name ? data.first_name.toLowerCase() : 'f';
                            lastName = data.last_name ? data.last_name.toLowerCase() : 'l';
                            _context.next = 11;
                            return UserModel.generateUniqueUserName({ firstName: firstName, lastName: lastName });

                        case 11:
                            username = _context.sent;

                            userObj['username'] = username;
                            userObj['firstName'] = firstName;
                            userObj['lastName'] = lastName;
                            userObj['email'] = data.email || null;
                            userObj['thumbnail'] = null;

                            if (!data.thumbnail) {
                                _context.next = 25;
                                break;
                            }

                            thumbnailName = 'thumb-50-' + (0, _functions.fileUniqueName)() + '.jpg';
                            _context.next = 21;
                            return _imageDownloader2.default.image({ url: data.thumbnail,
                                dest: './files/thumbs/' + thumbnailName });

                        case 21:
                            _ref2 = _context.sent;
                            filename = _ref2.filename;
                            image = _ref2.image;

                            userObj['thumbnail'] = thumbnailName;

                        case 25:
                            if (!(network === 'facebook')) {
                                _context.next = 34;
                                break;
                            }

                            pictureName = 'fb-' + (0, _functions.fileUniqueName)() + '.jpg';

                            if (!data.picture) {
                                _context.next = 34;
                                break;
                            }

                            _context.next = 30;
                            return _imageDownloader2.default.image({
                                url: data.picture + '?type=large',
                                dest: './files/' + pictureName
                            });

                        case 30:
                            _ref3 = _context.sent;
                            _filename = _ref3.filename;
                            _image = _ref3.image;

                            userObj['picture'] = pictureName;

                        case 34:
                            if (!(network === 'google')) {
                                _context.next = 43;
                                break;
                            }

                            _pictureName = 'g-' + (0, _functions.fileUniqueName)() + '.jpg';

                            if (!data.picture) {
                                _context.next = 43;
                                break;
                            }

                            _context.next = 39;
                            return _imageDownloader2.default.image({ url: data.picture.split('?sz=')[0],
                                dest: './files/' + _pictureName });

                        case 39:
                            _ref4 = _context.sent;
                            _filename2 = _ref4.filename;
                            _image2 = _ref4.image;

                            userObj['picture'] = _pictureName;

                        case 43:
                            _context.next = 45;
                            return userObj.save();

                        case 45:
                            newUser = _context.sent;

                            socialObj['user'] = newUser._id;
                            _context.next = 49;
                            return socialObj.save();

                        case 49:
                            resolve(newUser);
                            _context.next = 56;
                            break;

                        case 52:
                            _context.next = 54;
                            return UserModel.findById(user.user);

                        case 54:
                            existsUser = _context.sent;

                            resolve(existsUser);

                        case 56:
                            _context.next = 61;
                            break;

                        case 58:
                            _context.prev = 58;
                            _context.t0 = _context['catch'](0);

                            reject(_context.t0);

                        case 61:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 58]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
};

var SocialAuth = _mongoose2.default.model('SocialAuth', socialAuthSchema);

exports.default = SocialAuth;
//# sourceMappingURL=SocialAuth.js.map