import { Router } from 'express';
import { createTripHandler } from './handlers/create-trip.handler';
import { asyncHandler } from '@/utils/async-handler.util';
import { authGuard } from '@/middlewares/auth.middleware';
import { findTripByIdHandler, findTripsHandler } from './handlers/find-trip.handler';
import { deleteTripHandler } from './handlers/delete-trip.handler';
import { editTripHandler } from './handlers/edit-trip.handler';
import { createTripDocumentHandler } from './handlers/create-trip-document.handler';
import { findTripDocumentsHandler } from './handlers/find-trip-documents.handler';
import { createTripActivityHandler } from './handlers/create-trip-activity.handler';
import { findTripActivitiesHandler } from './handlers/find-trip-activities.handler';

const router: Router = Router();

router.post('/api/v1/trips', authGuard(), asyncHandler(createTripHandler));
router.get('/api/v1/trips', authGuard(), asyncHandler(findTripsHandler));

router.get('/api/v1/trips/:id', authGuard(), asyncHandler(findTripByIdHandler));
router.patch('/api/v1/trips/:id', authGuard(), asyncHandler(editTripHandler));
router.delete('/api/v1/trips/:id', authGuard(), asyncHandler(deleteTripHandler));

// Trip Documents
router.post('/api/v1/trips/:id/documents', authGuard(), asyncHandler(createTripDocumentHandler));
router.get('/api/v1/trips/:id/documents', authGuard(), asyncHandler(findTripDocumentsHandler));

// Trip Activities
router.post('/api/v1/trips/:id/activities', authGuard(), asyncHandler(createTripActivityHandler));
router.get('/api/v1/trips/:id/activities', authGuard(), asyncHandler(findTripActivitiesHandler));

export default router;
