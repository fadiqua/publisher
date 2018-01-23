'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = uploads;

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multer3 = require('../config/multer.config');

var _multer4 = _interopRequireDefault(_multer3);

var _uploadController = require('../controllers/uploadController');

var _uploadController2 = _interopRequireDefault(_uploadController);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadMemory = (0, _multer2.default)({ storage: _multer2.default.memoryStorage({}) });

function uploads(routes) {
    routes.post('/files', _multer4.default.single('file'), _uploadController2.default.uploadImage);
    // routes.post('/files/profile',  upload.single('file'), asyncMiddleware(uploadController.uploadProfilePicture))
    routes.post('/files/temp', _multer4.default.single('file'), (0, _services.asyncMiddleware)(_uploadController2.default.temp));
    routes.post('/files/profile', (0, _services.asyncMiddleware)(_uploadController2.default.uploadProfilePicture));
}
//# sourceMappingURL=uploads.js.map