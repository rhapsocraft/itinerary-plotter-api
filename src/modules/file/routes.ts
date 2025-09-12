import { authGuard } from '@/middlewares/auth.middleware';
import { asyncHandler } from '@/utils/async-handler.util';
import { Router } from 'express';
import { findFileByIdHandler, findFilesHandler } from './handlers/find-file.handler';
import { deleteFileByIdHandler, deleteFilesHandler } from './handlers/delete-file.handler';

const router: Router = Router();

router.get('/api/v1/file', authGuard(), asyncHandler(findFilesHandler));
router.get('/api/v1/file/:id', authGuard(), asyncHandler(findFileByIdHandler));
router.delete('/api/v1/file', authGuard(), asyncHandler(deleteFilesHandler));
router.delete('/api/v1/file/:id', authGuard(), asyncHandler(deleteFileByIdHandler));

export default router;
