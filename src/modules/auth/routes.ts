import express, { Router } from 'express';
import passport from 'passport';

const router: Router = express.Router();

// Google Authentication Route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback Route
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
  res.redirect('/api/v1/maintenance/health-check');
});

export default router;
