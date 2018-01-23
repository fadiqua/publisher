'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jwtLogin = exports.jwtOptions = exports.localLogin = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportJwt = require('passport-jwt');

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// set up options for local Strategy
var localOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}; // npm packages
var localLogin = exports.localLogin = new _passportLocal.Strategy(localOptions, function (req, username, password, done) {
    // Verify  username and password, call done with user,
    // if it is correct username and password, otherwise call done with false
    _index2.default.User.findOne({ username: username }).then(function (user) {
        if (!user) return done(null, false);
        user.comparePassword(password, function (err, isMatch) {
            if (err) return done(err);
            if (!isMatch) return done(null, false);
            return done(null, user);
        });
    }).catch(function (err) {
        return done(err);
    });
});

var jwtOptions = exports.jwtOptions = {
    jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization'),
    secretOrKey: _config2.default.jwtSecret
};
// Create JWT Strategy
var jwtLogin = exports.jwtLogin = new _passportJwt.Strategy(jwtOptions, function (payload, done) {

    _index2.default.User.findById(payload.sub).then(function (user) {
        if (!user) return done(null, false);
        return done(null, user);
    }).catch(function (error) {
        return done(error);
    });
});
//# sourceMappingURL=passport.js.map