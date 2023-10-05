import { Router } from 'express';
import { createCommentToAnnouncementController } from '../controllers/comment/createCommentToAnnouncement.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { commentCreateSchema } from '../schemas/comment.schema';
import { verifyTokenMiddleware } from '../middlewares/user/verifyToken.middleware';
import { readCommentsByAnnouncementController } from '../controllers/comment/readCommentsByAnnouncement.controller';
import { updateCommentController } from '../controllers/comment/updateComment.controller';
import { verifyOwnerOfTheCommentMiddleware } from '../middlewares/comment/verifyIsOwnerOfTheComment.middleware';
import { deleteCommentToAnnouncementController } from '../controllers/comment/deleteCommentToAnnouncement.controller';
import { verifyOwnerOfTheAnnouncementMiddleware } from '../middlewares/announcement/verifyIsOwnerTheAnnouncement.middleware';

export const commentRouter: Router = Router();

//1. Registro de comentário
commentRouter.post(
  '/:id',
  validateBodyMiddleware(commentCreateSchema),
  verifyTokenMiddleware,
  createCommentToAnnouncementController
);

//2. Listagem dos comentários de um anúncio (announcementId)
commentRouter.get('/:id', verifyTokenMiddleware, readCommentsByAnnouncementController);

//3. Edição de comentário
commentRouter.patch(
  '/:id',
  validateBodyMiddleware(commentCreateSchema),
  verifyTokenMiddleware,
  verifyOwnerOfTheCommentMiddleware,
  updateCommentController
);

//4. Exclusão de comentário
commentRouter.delete(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerOfTheAnnouncementMiddleware,
  deleteCommentToAnnouncementController
);
