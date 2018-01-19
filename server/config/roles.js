export const roles = {
    manager: {
        can: ['publish'],
        inherits: ['writer']
    },
    writer: {
        can: ['write', {
            name: 'edit',
            when: function (params, cb) {
                if(params.id !== params.owner){
                    cb('error', null)
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


class RBAC {
    constructor(opts) {
        this.init(opts);
    }
    init(roles) {
        if(typeof roles !== 'object') {
            throw new TypeError('Expected an object as input');
        }

        this.roles = roles;
        let map = {};
        Object.keys(roles).forEach(role => {
            map[role] = {
                can: {}
            };
            if(roles[role].inherits) {
                map[role].inherits = roles[role].inherits;
            }

            roles[role].can.forEach(operation => {
                if(typeof operation === 'string') {
                    map[role].can[operation] = 1;
                } else if(typeof operation.name === 'string'
                    && typeof operation.when === 'function') {

                    map[role].can[operation.name] = operation.when;
                }
                // Ignore definitions we don't understand
            });

        });

        this.roles = map;
    }
    can(role, operation, params) {
        return new Promise((resolve, reject) => {
            // Check if role exists
            if (typeof role !== 'string') {
                throw new TypeError('Expected first parameter to be string : role');
            }

            if (typeof operation !== 'string') {
                throw new TypeError('Expected second parameter to be string : operation');
            }

            if(!this.roles[role]) {
                reject('role does not exist.');
            }
            // Check if this role has this operation
            let $role = this.roles[role];

            if (!$role) {
                throw new Error('Undefined role');
            }
            // IF this operation is not defined at current level try higher
            if (!$role.can[operation]) {
                // If no parents reject
                if (!$role.inherits) {
                    return reject(false);
                }
                let canDo = false;

                $role.inherits.map(parent => {
                    return canDo = canDo || this.can(parent, operation, params)
                });
                if(canDo){resolve(true)}
                else { reject(false)}
            }
            // We have the operation resolve
            if ($role.can[operation] === 1) {
                return resolve(true);
            }
            // Operation is conditional, run async function
            if (typeof $role.can[operation] === 'function') {
                $role.can[operation](params, function (err, result) {
                    console.log('fadi', err, result);
                    if(err ) {
                        reject(err);
                    }
                    else if(!result ) {
                        reject(false);
                    } else {
                        resolve(true);
                    }
                });
            }
            // No operation reject as false
            reject(false);
        })

    }
}

export default RBAC;