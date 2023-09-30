import { Router } from 'express';
import { createCommentToAnnouncementController } from '../controllers/comment/createCommentToAnnouncement.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { commentCreateSchema } from '../schemas/comment';
import { verifyTokenMiddleware } from '../middlewares/user/verifyToken.middleware';
import { listCommentsByAnnouncementController } from '../controllers/comment/listCommentsByAnnouncement.controller';

export const commentRouter: Router = Router();

// Endpoints:
// 1. Registro de comentário
// 1.1 Requer auth
commentRouter.post(
  '/:id',
  validateBodyMiddleware(commentCreateSchema),
  verifyTokenMiddleware,
  createCommentToAnnouncementController
);

// 2. Listagem dos comentários de um anúncio
// 2.1 Requer auth
commentRouter.get('/:id', verifyTokenMiddleware, listCommentsByAnnouncementController);
