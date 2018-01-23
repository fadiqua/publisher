'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkPermission = undefined;

var _roles = require('../config/roles');

var _roles2 = _interopRequireDefault(_roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkPermission = {};
checkPermission.isOwner = function (req, res, next) {
    var _req$user = req.user,
        id = _req$user.id,
        permission = _req$user.permission;

    var _ref = req.query.owner ? req.query : req.body.owner ? req.body : req.params,
        owner = _ref.owner;

    var validate = new _roles2.default(_roles.roles);
    validate.can(permission, 'edit', { id: id, owner: owner }).then(function () {
        next();
    }).catch(function () {
        res.status(403).send({
            success: false,
            error: 'You don\'t have a permission.'
        });
    });
};

exports.checkPermission = checkPermission;
//# sourceMappingURL=checkPermissions.js.map