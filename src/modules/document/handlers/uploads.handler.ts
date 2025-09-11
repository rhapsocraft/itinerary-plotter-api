import { CreateFileDTO } from '@/modules/file/services/file.service';
import { RequestHandler, Express } from 'express';

function fileToDTO(file: Express.Multer.File): CreateFileDTO  {
    return {}
}

export const uploadFilesHandler: RequestHandler<any, any, any, any> = async (req, res) => {
  res.send(req.files);
};
