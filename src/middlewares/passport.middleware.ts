import passport from 'passport';
import { Strategy as GoogleStrategry } from 'passport-google-oauth20';
import { env } from '@/config/environment';
import { RequestHandler, Express } from 'express';

// Initialize Google Auth passport strategy
passport.use(
  new GoogleStrategry(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_AUTH_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      // Here we can create user

      console.log('GOOGLE AUTH: ', JSON.stringify(profile));

      return cb(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  // TODO: Fetch user to deserialize once we are storing in database
  done(null, id as any);
});

export function passportMiddleWare(): RequestHandler[] {
  return [passport.initialize(), passport.session()];
}
