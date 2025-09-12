import { batchCreate, CreateFileDTO } from '@/modules/file/services/file.service';
import { RequestHandler } from 'express';

type UploadFilesResponse =
  | {
      attachments: Partial<File>[];
    }
  | string;

function fileToDTO(file: Express.Multer.File, uploaderId: string): CreateFileDTO {
  return {
    displayName: file.originalname,
    name: file.filename,
    size: file.size,
    src: file.path,
    type: file.mimetype,
    uploaderId,
  };
}

export const uploadFilesHandler: RequestHandler<any, UploadFilesResponse, any, any> = async (req, res) => {
  const userId = req.user?.userId;

  if (userId && req.files) {
    const fileDTOs = (req.files as Express.Multer.File[]).map((file) => fileToDTO(file, userId));
    const files = await batchCreate(fileDTOs);

    res.status(201).send({
      attachments: files,
    });
  } else {
    res.status(403).send('No associated internal user');
  }
};
