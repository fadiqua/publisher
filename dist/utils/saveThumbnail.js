'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gM = _gm2.default.subClass({ imageMagick: true });

var saveThumbnail = function saveThumbnail(file) {
    var thumbName = 'thumb-80-' + new Date().valueOf() + '-' + Math.random() * 99999 + _path2.default.extname(file.originalname);
    return new Promise(function (resolve, reject) {
        gM(file.path).resize(50, 50, '^').noProfile().gravity('center').extent(50, 50).write('./files/thumbs/' + thumbName, function (err) {
            if (!err) {
                resolve(thumbName);
            }
            reject(err);
        });
    });
};

exports.default = saveThumbnail;
//# sourceMappingURL=saveThumbnail.js.map