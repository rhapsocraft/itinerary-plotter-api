import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from '@/config/environment';
import { RequestHandler } from 'express';
import { registerGoogleUserUseCase } from '@/modules/auth/use-cases/register-google-user.use-case';
import { findById as findGoogleAccountById } from '@/modules/user/services/google-account.service';

// Initialize Google Auth passport strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_AUTH_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      // Here we can create user
      let existingAccount = await findGoogleAccountById(profile.id);

      if (!existingAccount) {
        existingAccount = await registerGoogleUserUseCase(profile);
      }

      cb(null, existingAccount);
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
