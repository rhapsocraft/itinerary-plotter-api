import { authGuard } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { createActivityDocumentHandler } from './handlers/create-activity-document.handler';
import { findActivityDocumentsHandler } from './handlers/find-activity-documents.handler';
import { asyncHandler } from '@/utils/async-handler.util';
import { editActivityHandler } from './handlers/edit-activity.handler';

const router: Router = Router();

// Activity Documents
router.post('/api/v1/activities/:id/documents', authGuard(), asyncHandler(createActivityDocumentHandler));
router.get('/api/v1/activities/:id/documents', authGuard(), asyncHandler(findActivityDocumentsHandler));
router.patch('/api/v1/activities/:id', authGuard(), asyncHandler(editActivityHandler));

export default router;
