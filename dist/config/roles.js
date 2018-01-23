'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var roles = exports.roles = {
    manager: {
        can: ['publish'],
        inherits: ['writer']
    },
    writer: {
        can: ['write', {
            name: 'edit',
            when: function when(params, cb) {
                if (params.id !== params.owner) {
                    cb('error', null);
                }
                cb(null, params.id === params.owner);
            }
        }],
        inherits: ['guest']
    },
    guest: {
        can: ['read']
    }
};

var RBAC = function () {
    function RBAC(opts) {
        _classCallCheck(this, RBAC);

        this.init(opts);
    }

    _createClass(RBAC, [{
        key: 'init',
        value: function init(roles) {
            if ((typeof roles === 'undefined' ? 'undefined' : _typeof(roles)) !== 'object') {
                throw new TypeError('Expected an object as input');
            }

            this.roles = roles;
            var map = {};
            Object.keys(roles).forEach(function (role) {
                map[role] = {
                    can: {}
                };
                if (roles[role].inherits) {
                    map[role].inherits = roles[role].inherits;
                }

                roles[role].can.forEach(function (operation) {
                    if (typeof operation === 'string') {
                        map[role].can[operation] = 1;
                    } else if (typeof operation.name === 'string' && typeof operation.when === 'function') {

                        map[role].can[operation.name] = operation.when;
                    }
                    // Ignore definitions we don't understand
                });
            });

            this.roles = map;
        }
    }, {
        key: 'can',
        value: function can(role, operation, params) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                // Check if role exists
                if (typeof role !== 'string') {
                    throw new TypeError('Expected first parameter to be string : role');
                }

                if (typeof operation !== 'string') {
                    throw new TypeError('Expected second parameter to be string : operation');
                }

                if (!_this.roles[role]) {
                    reject('role does not exist.');
                }
                // Check if this role has this operation
                var $role = _this.roles[role];

                if (!$role) {
                    throw new Error('Undefined role');
                }
                // IF this operation is not defined at current level try higher
                if (!$role.can[operation]) {
                    // If no parents reject
                    if (!$role.inherits) {
                        return reject(false);
                    }
                    var canDo = false;

                    $role.inherits.map(function (parent) {
                        return canDo = canDo || _this.can(parent, operation, params);
                    });
                    if (canDo) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                }
                // We have the operation resolve
                if ($role.can[operation] === 1) {
                    return resolve(true);
                }
                // Operation is conditional, run async function
                if (typeof $role.can[operation] === 'function') {
                    $role.can[operation](params, function (err, result) {
                        console.log('fadi', err, result);
                        if (err) {
                            reject(err);
                        } else if (!result) {
                            reject(false);
                        } else {
                            resolve(true);
                        }
                    });
                }
                // No operation reject as false
                reject(false);
            });
        }
    }]);

    return RBAC;
}();

exports.default = RBAC;
//# sourceMappingURL=roles.js.map