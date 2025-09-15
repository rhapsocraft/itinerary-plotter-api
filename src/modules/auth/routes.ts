import { asyncHandler } from '@/utils/async-handler.util';
import { Router } from 'express';
import passport from 'passport';
import { logoutHandler } from './handlers/logout.handler';
import { googleAuthenticationHandler, googleSuccessfulLoginHandler } from './handlers/google.handler';

const router: Router = Router();

// Google Authentication Route
router.get('/auth/google', asyncHandler(googleAuthenticationHandler));

// Google Callback Route
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), asyncHandler(googleSuccessfulLoginHandler));

router.get('/auth/logout', asyncHandler(logoutHandler));

export default router;
