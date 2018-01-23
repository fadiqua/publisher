'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jwtAuth = jwtAuth;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jwtAuth(req, res, next) {
    // var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
    try {
        var token = req.headers['authorization'];
        var decoded = _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret);
        decoded.id = decoded.sub;
        delete decoded.sub;
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({
            success: false,
            error: e
        });
    }
}
//# sourceMappingURL=jwtAuth.js.map