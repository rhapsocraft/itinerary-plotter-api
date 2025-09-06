import passport from 'passport';
import { Strategy as GoogleStrategry } from 'passport-google-oauth20';

// Initialize Google Auth passport strategy

passport.use(
  new GoogleStrategry(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      // Here we can create user

      return cb(null, profile);
    },
  ),
);

export function passportMiddleWare() {}
