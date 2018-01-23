'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// multer config
var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, 'files');
    },
    filename: function filename(req, file, cb) {
        cb(null, new Date().valueOf() + '-' + Math.random() * 99999 + _path2.default.extname(file.originalname));
    },
    fileFilter: function fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});
var upload = (0, _multer2.default)({ storage: storage });

exports.default = upload;
//# sourceMappingURL=multer.config.js.map