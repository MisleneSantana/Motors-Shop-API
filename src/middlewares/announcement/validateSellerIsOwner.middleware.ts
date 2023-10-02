import { NextFunction, Request, Response } from 'express';
import { announcementRepo } from '../../repositories';
import { AppError } from '../../errors/error';
import { UserRole } from '../../interfaces/user.interfaces';

export const validateSellerIsOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = res.locals.decoded.sub;
  const { account_type } = res.locals.decoded;
  const announcementId: string = req.params.id;

  const announcement = await announcementRepo.findOne({ where: { id: announcementId }, relations: { user: true } });
  if (!announcement) throw new AppError('Announcement not found', 404);

  if (account_type.toUpperCase() !== UserRole.ANUNCIANTE.toUpperCase()) {
    throw new AppError('Insufficient permission', 403);
  }

  if (announcement.user.id !== userId) throw new AppError('Insufficient permission', 403);

  return next();
};
