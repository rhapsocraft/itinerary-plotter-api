import { RequestHandler } from 'express';
import { deleteAll, deleteById, findAll, findById, type FindFilesDTO } from '../services/file.service';
import { Selectable } from 'kysely';
import { File } from '@/db/types';

type FindFilesRequest = FindFilesDTO;

type FindFileResponse = Selectable<File>;

export const findFilesHandler: RequestHandler<any, FindFileResponse[], FindFilesRequest, any> = async (req, res, next) => {
  const files = await findAll({
    uploaderId: req.user?.userId,
    id: req.body?.id,
    name: req.body?.name,
    type: req.body?.type,
  });

  res.status(200).send(files);
};

export const findFileByIdHandler: RequestHandler<{ id: string }, FindFileResponse, any, any> = async (req, res) => {
  const file = await findById(req.params.id);

  res.status(200).send(file);
};
