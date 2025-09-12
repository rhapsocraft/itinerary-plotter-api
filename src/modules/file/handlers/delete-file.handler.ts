import { RequestHandler } from 'express';
import { deleteAll, deleteById, type FindFilesDTO } from '../services/file.service';
import { Selectable } from 'kysely';
import { File } from '@/db/types';

type DeleteFilesRequest = FindFilesDTO;

type DeleteFileResponse = Selectable<File>;

export const deleteFilesHandler: RequestHandler<any, DeleteFileResponse[], DeleteFilesRequest, any> = async (req, res, next) => {
  const files = await deleteAll({
    uploaderId: req.user?.userId,
    id: req.body?.id,
    name: req.body?.name,
    type: req.body?.type,
  });

  res.status(200).send(files);
};

export const deleteFileByIdHandler: RequestHandler<{ id: string }, DeleteFileResponse, any, any> = async (req, res) => {
  const file = await deleteById(req.params.id);

  res.status(200).send(file);
};
