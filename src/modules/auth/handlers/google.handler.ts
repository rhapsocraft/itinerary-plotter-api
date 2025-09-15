import { env } from '@/config/environment';
import { RequestHandler } from 'express';
import passport from 'passport';

const AUTH_REDIRECT_COOKIE_NAME = 'auth_redirect_uri';

export const googleAuthenticationHandler: RequestHandler<any, any, any, { authRedirect: string }> = (req, res, next) => {
  if (req.query.authRedirect) {
    res.cookie(AUTH_REDIRECT_COOKIE_NAME, req.query.authRedirect, {
      httpOnly: true,
      secure: env.isProduction, // HTTPS in production
      maxAge: 5 * 60 * 1000, // 5 minutes expiry
      sameSite: 'lax',
    });
  }

  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

export const googleSuccessfulLoginHandler: RequestHandler<any, any, any, any> = (req, res) => {
  const redirectTarget = req.cookies?.[AUTH_REDIRECT_COOKIE_NAME] as string;
  res.clearCookie(AUTH_REDIRECT_COOKIE_NAME);

  if (redirectTarget) {
    res.status(302).redirect(redirectTarget);
  } else {
    res.status(200).send(200);
  }
};
