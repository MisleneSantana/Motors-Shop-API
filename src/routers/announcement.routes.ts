import { Router } from 'express';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { announcementCreateSchema, announcementUpdateSchema } from '../schemas/announcement.schema';
import { createAnnouncementController } from '../controllers/announcement/createAnnouncement.controller';
import { verifyTokenMiddleware } from '../middlewares/user/verifyToken.middleware';
import { verifyUserIdExistsMiddleware } from '../middlewares/user/verifyUserIdExists.middleware';
import { readAnnouncementsController } from '../controllers/announcement/readAnnouncements.controller';
import { readAnnouncementByIdController } from '../controllers/announcement/readAnnouncementById.controller';
import { readAnnouncementsBySellerController } from '../controllers/announcement/readAnnouncementsBySeller.controller';
import { validateTheUuidMiddleware } from '../middlewares/user/validateTheUuid.middleware';
import { updateAnnouncementController } from '../controllers/announcement/updateAnnouncement.controller';
import { deleteAnnouncementController } from '../controllers/announcement/deleteAnnouncement.controller';
import { validateSellerIsOwnerMiddleware } from '../middlewares/announcement/validateSellerIsOwner.middleware';
import { readImagesByAnnouncementController } from '../controllers/announcement/readImagesByAnnouncement.controller';
import multer from 'multer';
import { storage } from '../utils/multerConfig.util';
import { paginationMiddleware } from '../middlewares/pagination.middleware';
import { ordinationMiddleware } from '../middlewares/ordination.middleware';

export const announcementRouter: Router = Router();

announcementRouter.use('', verifyUserIdExistsMiddleware);

//1. Criar um anúncio e suas imagens
announcementRouter.post(
  '',
  validateBodyMiddleware(announcementCreateSchema),
  verifyTokenMiddleware,
  createAnnouncementController
);

//2. Listagem de todos os anúncios
announcementRouter.get('', paginationMiddleware, ordinationMiddleware, readAnnouncementsController);

//3. Listagem de um anúncio por id (announcementId)
announcementRouter.get('/:id', validateTheUuidMiddleware, readAnnouncementByIdController);

//4. Listagem de todos os anúncios de um anunciante (userId)
announcementRouter.get('/:id/seller', validateTheUuidMiddleware, readAnnouncementsBySellerController);

//5. Listagem das imagens de um anúncio (announcementId/images)
announcementRouter.get('/:id/images', validateTheUuidMiddleware, readImagesByAnnouncementController);

//6. Edição de um anúncio
announcementRouter.patch(
  '/:id',
  validateBodyMiddleware(announcementUpdateSchema),
  verifyTokenMiddleware,
  validateSellerIsOwnerMiddleware,
  updateAnnouncementController
);

//7. Exclusão de um anúncio
announcementRouter.delete('/:id', verifyTokenMiddleware, validateSellerIsOwnerMiddleware, deleteAnnouncementController);

//8. Upload de imagens com Multer (não utilizado)
const upload = multer({ storage: storage });
announcementRouter.post('/upload', verifyTokenMiddleware, upload.array('images'), (req, res) => {
  return res.json(req.file?.filename);
});
