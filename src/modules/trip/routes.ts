import { Router } from 'express';
import { createTripHandler } from './handlers/create-trip.handler';
import { asyncHandler } from '@/utils/async-handler.util';
import { authGuard } from '@/middlewares/auth.middleware';
import { findTripsHandler } from './handlers/find-trip.handler';

const router: Router = Router();

router.post('/api/v1/trip', authGuard(), asyncHandler(createTripHandler));
router.get('/api/v1/trip', authGuard(), asyncHandler(findTripsHandler));

export default router;
