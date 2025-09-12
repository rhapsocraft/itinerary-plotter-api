import { authGuard } from '@/middlewares/auth.middleware';
import { asyncHandler } from '@/utils/async-handler.util';
import { Router } from 'express';
import { findFileByIdHandler, findFilesHandler } from './handlers/find-file.handler';
import { deleteFileByIdHandler, deleteFilesHandler } from './handlers/delete-file.handler';

const router: Router = Router();

router.get('/api/v1/files', authGuard(), asyncHandler(findFilesHandler));
router.get('/api/v1/files/:id', authGuard(), asyncHandler(findFileByIdHandler));
router.delete('/api/v1/files', authGuard(), asyncHandler(deleteFilesHandler));
router.delete('/api/v1/files/:id', authGuard(), asyncHandler(deleteFileByIdHandler));

export default router;
