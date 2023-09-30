import { Router } from 'express';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { announcementCreateSchema } from '../schemas/announcement.schema';
import { createAnnouncementController } from '../controllers/announcement/createAnnouncement.controller';
import { verifyTokenMiddleware } from '../middlewares/user/verifyToken.middleware';
import { verifyUserIdExistsMiddleware } from '../middlewares/user/verifyUserIdExists.middleware';

export const announcementRouter: Router = Router();

announcementRouter.use('', verifyUserIdExistsMiddleware);

// Endpoints:
// 1. Criar um anúncio e suas imagens
announcementRouter.post(
  '',
  // validateBodyMiddleware(announcementCreateSchema),
  verifyTokenMiddleware,
  createAnnouncementController
);
