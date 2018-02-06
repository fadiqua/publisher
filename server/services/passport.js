// npm packages
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import db from '../models/index';
import config from '../config/config';

// set up options for local Strategy
const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
};
export const localLogin = new LocalStrategy(localOptions, ((req, username, password, done) => {
  // Verify  username and password, call done with user,
  // if it is correct username and password, otherwise call done with false
  db.User.findOne({ username }).then((user) => {
    if (!user) return done(null, false);
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
      return done(null, user);
    });
  }).catch(err => done(err));
}));

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret,
};
// Create JWT Strategy
export const jwtLogin = new JwtStrategy(jwtOptions, ((payload, done) => {
  db.User.findById(payload.sub).then((user) => {
    if (!user) return done(null, false);
    return done(null, user);
  }).catch(error => done(error));
}));

