import { asyncHandler } from '@/utils/async-handler.util';
import { Router } from 'express';
import passport from 'passport';
import { logoutHandler } from './handlers/logout.handler';

const router: Router = Router();

// Google Authentication Route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback Route
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
  // Authentication Successful
  res.send(200);
});

router.get('/auth/logout', asyncHandler(logoutHandler));

router.get('/auth/test', (req, res) => {
  res.redirect('http://localhost:3000/api/v1/maintenance/health-check');
});

export default router;
