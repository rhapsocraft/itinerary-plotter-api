import { asyncHandler } from '@/utils/async-handler.util';
import express, { Router } from 'express';
import passport from 'passport';
import { logoutHandler } from './handlers/logout.handler';

const router: Router = express.Router();

// Google Authentication Route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback Route
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
  // Authentication Successful
  res.send(200);
});

router.get('/auth/logout', asyncHandler(logoutHandler));

export default router;
