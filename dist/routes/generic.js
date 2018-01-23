'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _genericController = require('../controllers/genericController');

var _genericController2 = _interopRequireDefault(_genericController);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generic(routes) {
    routes.get("/search", (0, _services.asyncMiddleware)(_genericController2.default.search));
    routes.get("/advancedSearch/", (0, _services.asyncMiddleware)(_genericController2.default.advancedSearch));
}

exports.default = generic;
//# sourceMappingURL=generic.js.map