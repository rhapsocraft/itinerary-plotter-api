import { asyncHandler } from '@/utils/async-handler.util';
import { Router } from 'express';
import { healthCheckHandler } from './handlers/health-check.handler';

const router: Router = Router();

router.get('/api/v1/maintenance/health-check', asyncHandler(healthCheckHandler));

export default router;
