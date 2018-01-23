"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var asyncMiddleware = exports.asyncMiddleware = function asyncMiddleware(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
//# sourceMappingURL=asyncMiddleware.js.map