import { RequestHandler } from 'express';

export const logoutHandler: RequestHandler = (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }

    res.send(200);
  });
};
