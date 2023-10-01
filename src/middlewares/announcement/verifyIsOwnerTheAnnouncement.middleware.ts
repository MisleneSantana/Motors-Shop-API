import { NextFunction, Request, Response } from 'express';
import { commentRepo } from '../../repositories';
import { AppError } from '../../errors/error';
import { UserRole } from '../../interfaces/user.interfaces';

export const verifyOwnerOfTheAnnouncementMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = res.locals.decoded.sub;
  const commentId: string = req.params.id;
  const { account_type } = res.locals.decoded;

  const comment = await commentRepo.findOne({ where: { id: commentId }, relations: { user: true } });
  if (!comment) throw new AppError('Comment not found', 404);

  if (account_type.toUpperCase() === UserRole.ANUNCIANTE.toUpperCase()) {
    return next();
  }

  if (comment.user.id !== userId) throw new AppError('Insufficient permission', 403);

  return next();
};
