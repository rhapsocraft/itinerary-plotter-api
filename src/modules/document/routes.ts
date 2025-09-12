import { upload } from '@/middlewares/file-upload.middleware';
import { asyncHandler } from '@/utils/async-handler.util';
import { Router } from 'express';
import { uploadFilesHandler } from './handlers/uploads.handler';
import { authGuard } from '@/middlewares/auth.middleware';
import { editDocumentHandler } from './handlers/edit-document.handler';

const router: Router = Router();

router.patch('/api/v1/documents/:id', authGuard(), asyncHandler(editDocumentHandler));

// File Uploads
router.post('/api/v1/documents/:id/upload', authGuard(), upload.array('attachments'), asyncHandler(uploadFilesHandler));

export default router;
