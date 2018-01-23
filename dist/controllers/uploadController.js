'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _lokijs = require('lokijs');

var _lokijs2 = _interopRequireDefault(_lokijs);

var _multer = require('../config/multer.config');

var _multer2 = _interopRequireDefault(_multer);

var _saveThumbnail = require('../utils/saveThumbnail');

var _saveThumbnail2 = _interopRequireDefault(_saveThumbnail);

var _functions = require('../utils/functions');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var dbLoki = new _lokijs2.default('files/images', { persistenceMethod: 'fs' });
var uploadController = {};

uploadController.uploadImage = function (req, res) {
    var file = req.file; // file passed from client
    var meta = req.body; // all other values passed from the client, like name, etc..
    res.status(200).send({
        success: true,
        file: file
    });
};

// uploadController.uploadProfilePicture = async (req, res) => {
//     const file = req.file; // file passed from client
//     // console.log('file ', file)
//     // const col = await loadCollection('files/images', dbLoki);
//     // const data = col.insert(req.file);
//     // dbLoki.saveDatabase();
//     try {
//         const thumb = await saveThumbnail(file);
//         res.status(200).send({
//             success: true,
//             file,
//             thumb
//         })
//     } catch(e) {
//         res.status(500).send({
//             success: false
//         })
//     }
//
// }
uploadController.temp = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var file;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        file = req.file; // file passed from client;

                        res.status(200).send({
                            success: true,
                            file: file
                        });
                        setTimeout(function () {
                            _fs2.default.unlink(_path2.default.resolve(__dirname, '..', '..', file.path), function (err) {
                                if (err) return;
                                console.log('success');
                            });
                        }, 1000 * 60 * 60);

                    case 3:
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

uploadController.uploadProfilePicture = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var base64Data, originalname, file, thumb;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        base64Data = req.body.image;
                        _context2.prev = 1;

                        // path.resolve(__dirname, '..', '..', `files/${'base64-image.png'}`)
                        originalname = new Date().valueOf() + '-' + Math.random() * 99999 + '.png';
                        file = {
                            originalname: originalname,
                            path: './files/' + originalname
                        };

                        (0, _functions.base64Decode)(base64Data, file.path);
                        _context2.next = 7;
                        return (0, _saveThumbnail2.default)(file);

                    case 7:
                        thumb = _context2.sent;

                        res.status(200).json({
                            success: true,
                            file: file,
                            thumb: thumb
                        });
                        _context2.next = 14;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](1);

                        res.status(500).send({
                            error: _context2.t0.message
                        });

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 11]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
exports.default = uploadController;
//# sourceMappingURL=uploadController.js.map