import { NextFunction, Request, Response } from 'express';

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const queryPage: number = Number(req.query.page);
  const queryPerPage: number = Number(req.query.perPage);

  const page: number = queryPage && queryPage > 1 ? queryPage : 1;
  const perPage: number = queryPerPage && queryPerPage <= 26 && queryPerPage > 26 ? queryPerPage : 26;

  const baseUrl: string = `http://localhost:3000/announcements`;
  let prevPage: string | null = `${baseUrl}?page=${page - 1}&perPage=${perPage}`;
  const nextPage: string = `${baseUrl}?page=${page + 1}&perPage=${perPage}`;

  if (page - 1 <= 0) {
    prevPage = null;
  }

  res.locals = {
    ...res.locals,
    pagination: {
      page: perPage * (page - 1),
      perPage,
      prevPage,
      nextPage,
    },
  };

  return next();
};
