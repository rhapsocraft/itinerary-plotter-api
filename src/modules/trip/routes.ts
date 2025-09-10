import { Router } from 'express';
import { createTripHandler } from './handlers/create-trip.handler';

const router: Router = Router();

router.post('api/v1/trip', createTripHandler);

export default router;
