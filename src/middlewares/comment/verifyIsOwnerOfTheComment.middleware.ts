import { NextFunction, Request, Response } from 'express';
import { commentRepo } from '../../repositories';
import { AppError } from '../../errors/error';

export const verifyOwnerOfTheCommentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = res.locals.decoded.sub;
  const commentId: string = req.params.id;

  const comment = await commentRepo.findOne({ where: { id: commentId }, relations: { user: true } });
  if (!comment) throw new AppError('Comment not found', 404);

  if (comment.user.id !== userId) throw new AppError('Insufficient permission', 403);

  return next();
};
