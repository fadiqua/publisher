'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateSalt = generateSalt;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateSalt(str) {
    return new Promise(function (resolve, reject) {
        return (
            // Generate hash's random salt
            _bcrypt2.default.genSalt(10, function (err, salt) {

                if (err) {
                    return reject(err);
                }

                // Now, with the given salt, generate the hash
                _bcrypt2.default.hash(str, salt, function (err, hash) {
                    if (err) {
                        return reject(err);
                    }

                    // Hash generated successfully!
                    return resolve(hash);
                });
            })
        );
    });
}
//# sourceMappingURL=generateSalt.js.map