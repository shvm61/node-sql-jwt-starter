const passport = require("passport");

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayLoad, done) {
    try {
      let user = await User.findOne({
        where: { username: jwtPayLoad.username },
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log("Error in finding user from JWT");
      return;
    }
  })
);

module.exports = passport;
