import { RequestHandler } from 'express';
import { uploadDocumentFilesUseCase } from '../use-cases/upload-files.use-case';

type UploadFilesResponse =
  | {
      id: string;
      files: Partial<File>[];
    }
  | string;

export const uploadFilesHandler: RequestHandler<{ id: string }, UploadFilesResponse, any, any> = async (req, res) => {
  const userId = req.user?.userId;

  if (userId && req.files) {
    const files = await uploadDocumentFilesUseCase(req.params.id, req.files as Express.Multer.File[], userId);
    res.status(201).send({
      id: req.params.id,
      files: files,
    });
  } else {
    res.status(403).send('No associated internal user');
  }
};
