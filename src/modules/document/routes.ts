import { upload } from '@/middlewares/file-upload.middleware';
import { asyncHandler } from '@/utils/async-handler.util';
import { Router } from 'express';
import { uploadFilesHandler } from './handlers/uploads.handler';

const router: Router = Router();

router.post('/api/v1/document/upload', upload.array('attachments'), asyncHandler(uploadFilesHandler));

export default router;
