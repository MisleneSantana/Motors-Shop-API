import { Router } from 'express';
import { createUserController } from '../controllers/users/createUser.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { userCreateSchema, userUpdateSchema } from '../schemas/user.schema';
import { verifyUserEmailExistsMiddleware } from '../middlewares/user/verifyUserEmailExists.middleware';
import { verifyCpfExistsMiddleware } from '../middlewares/user/verifyCpfExists.middleware';
import { readUsersController } from '../controllers/users/readUsers.controller';
import { verifyTokenMiddleware } from '../middlewares/user/verifyToken.middleware';
import { verifyUserIsOwnerMiddleware } from '../middlewares/user/verifyUserIsOwner.middleware';
import { updateUserController } from '../controllers/users/updateUser.controller';
import { verifyUserIdExistsMiddleware } from '../middlewares/user/verifyUserIdExists.middleware';

export const userRouter: Router = Router();

// Endpoints:
// 1.  Registro de usuário:
// 1.1 Não requer permissão
userRouter.post(
  '',
  validateBodyMiddleware(userCreateSchema),
  verifyUserEmailExistsMiddleware,
  verifyCpfExistsMiddleware,
  createUserController
);

// 2. Lista todos os usuários:
userRouter.get('', readUsersController);

userRouter.use('/:id', verifyUserIdExistsMiddleware);

// 3. Atualiza um usuário:
// 3.1 A rota deve atualizar os dados do usuário
// 3.2 Não deve ser possível atualizar os campos id e account_type
// 3.3 Atualizar apenas seu próprio usuário
userRouter.patch(
  '/:id',
  validateBodyMiddleware(userUpdateSchema),
  // verifyTokenMiddleware,
  // verifyUserIsOwnerMiddleware,
  updateUserController
);
