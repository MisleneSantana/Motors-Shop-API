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
import { readImagesByAnnouncementController } from '../controllers/announcement/readImagesByAnnouncement.service';
import multer from 'multer';
import { storage } from '../utils/multerConfig.util';

export const announcementRouter: Router = Router();

announcementRouter.use('', verifyUserIdExistsMiddleware);

// Endpoints:
//1. Criar um anúncio e suas imagens
//1.1 Apenas perfil de anunciante
//1.2 As imagens devem ser vinculadas ao anúncio na rota de registro de anúncio
announcementRouter.post(
  '',
  validateBodyMiddleware(announcementCreateSchema),
  verifyTokenMiddleware,
  createAnnouncementController
);

//2. Listagem de todos os anúncios
//2.1 Não requer proteção
announcementRouter.get('', readAnnouncementsController);

//3. Listagem de um anúncio por id (announcementId)
//3.1 Não requer proteção
announcementRouter.get('/:id', validateTheUuidMiddleware, readAnnouncementByIdController);

//4. Listagem de todos os anúncios de um anunciante (userId)
//4.1 Não requer proteção
announcementRouter.get('/:id/seller', validateTheUuidMiddleware, readAnnouncementsBySellerController);

//7. Listagem das imagens de um anúncio (announcementId/images)
//7.1 Não requer proteção
announcementRouter.get('/:id/images', validateTheUuidMiddleware, readImagesByAnnouncementController);

//5. Edição de um anúncio
//5.1 Apenas o anunciante dono do anúncio, pode editar o mesmo.
announcementRouter.patch(
  '/:id',
  validateBodyMiddleware(announcementUpdateSchema),
  verifyTokenMiddleware,
  validateSellerIsOwnerMiddleware,
  updateAnnouncementController
);

//6. Exclusão de um anúncio (sem necessidade de soft delete).
//6.1 Implementei o soft remove (inativação) - para reacessar os dados (with deleted());
//6.2 Apenas o anunciante dono do anúncio, pode excluir o mesmo.
announcementRouter.delete('/:id', verifyTokenMiddleware, validateSellerIsOwnerMiddleware, deleteAnnouncementController);

//8. Upload de imagens com Multer (Para fins de estudo - Visto que as images não são criadas separadamente)
const upload = multer({ storage: storage });
announcementRouter.post('/upload', verifyTokenMiddleware, upload.array('images'), (req, res) => {
  return res.json(req.file?.filename);
});
