const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    User.findOne({ email }, async (error, user) => {
      if (error) return done(error);

      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch(error) {
        return done(error);
      }
    });
  }

  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, authenticateUser));
}

module.exports = initialize;
