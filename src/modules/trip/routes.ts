import { Router } from 'express';
import { createTripHandler } from './handlers/create-trip.handler';
import { asyncHandler } from '@/utils/async-handler.util';
import { authGuard } from '@/middlewares/auth.middleware';
import { findTripByIdHandler, findTripsHandler } from './handlers/find-trip.handler';
import { deleteTripHandler } from './handlers/delete-trip.handler';
import { editTripHandler } from './handlers/edit-trip.handler';

const router: Router = Router();

router.post('/api/v1/trip', authGuard(), asyncHandler(createTripHandler));
router.get('/api/v1/trip', authGuard(), asyncHandler(findTripsHandler));

router.get('/api/v1/trip/:id', authGuard(), asyncHandler(findTripByIdHandler));
router.patch('/api/v1/trip/:id', authGuard(), asyncHandler(editTripHandler));
router.delete('/api/v1/trip/:id', authGuard(), asyncHandler(deleteTripHandler));

export default router;
