import { Router } from 'express';
import { createCommentToAnnouncementController } from '../controllers/comment/createCommentToAnnouncement.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { commentCreateSchema } from '../schemas/comment';
import { verifyTokenMiddleware } from '../middlewares/user/verifyToken.middleware';
import { readCommentsByAnnouncementController } from '../controllers/comment/readCommentsByAnnouncement.controller';
import { updateCommentController } from '../controllers/comment/updateComment.controller';
import { verifyOwnerOfTheCommentMiddleware } from '../middlewares/comment/verifyIsOwnerOfTheComment.middleware';
import { deleteCommentToAnnouncementController } from '../controllers/comment/deleteCommentToAnnouncement.controller';
import { verifyOwnerOfTheAnnouncementMiddleware } from '../middlewares/announcement/verifyIsOwnerTheAnnouncement.middleware';

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

// 2. Listagem dos comentários de um anúncio (announcementId)
// 2.1 Requer auth
commentRouter.get('/:id', verifyTokenMiddleware, readCommentsByAnnouncementController);

// 3. Edição de comentário
// 3.1 Requer auth
// 3.2 Apenas owner do comentário
commentRouter.patch(
  '/:id',
  validateBodyMiddleware(commentCreateSchema),
  verifyTokenMiddleware,
  verifyOwnerOfTheCommentMiddleware,
  updateCommentController
);

// 4. Exclusão de comentário
// 4.1 Requer auth
// 4.2 Apenas owner do comentário
// 4.3 Anunciante pode excluir qualquer comentário caso seja dono do anúncio
commentRouter.delete(
  '/:id',
  verifyTokenMiddleware,
  verifyOwnerOfTheAnnouncementMiddleware,
  deleteCommentToAnnouncementController
);
