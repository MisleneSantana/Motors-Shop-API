import { NextFunction, Request, Response } from 'express';

export const ordinationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const querySort: any = req.query.sort;
  const queryOrder: any = req.query.order;

  const sortOptions: Array<string> = ['brand', 'createdAt'];
  const orderOptions: Array<string> = ['asc', 'desc'];

  let sort: string;
  let order: string;

  if (!(querySort && sortOptions.includes(querySort))) {
    sort = 'id';
  } else {
    sort = querySort;
  }

  if (!querySort || !(queryOrder && orderOptions.includes(queryOrder))) {
    order = 'asc';
  } else {
    order = queryOrder;
  }

  res.locals.pagination = {
    ...res.locals.pagination,
    order,
    sort,
  };

  return next();
};
