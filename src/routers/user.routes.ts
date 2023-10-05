import { Router } from 'express';
import { createUserController } from '../controllers/user/createUser.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { userCreateSchema, userUpdateSchema } from '../schemas/user.schema';
import { verifyUserEmailExistsMiddleware } from '../middlewares/user/verifyUserEmailExists.middleware';
import { verifyCpfExistsMiddleware } from '../middlewares/user/verifyCpfExists.middleware';
import { readUsersController } from '../controllers/user/readUsers.controller';
import { verifyTokenMiddleware } from '../middlewares/user/verifyToken.middleware';
import { verifyUserIsOwnerMiddleware } from '../middlewares/user/verifyUserIsOwner.middleware';
import { updateUserController } from '../controllers/user/updateUser.controller';
import { verifyUserIdExistsMiddleware } from '../middlewares/user/verifyUserIdExists.middleware';
import { validateTheUuidMiddleware } from '../middlewares/user/validateTheUuid.middleware';
import { readUserByIdController } from '../controllers/user/readUserById.controller';
import { deleteUserController } from '../controllers/user/deleteUser.controller';
import { sendEmailWithCodeController } from '../controllers/user/sendEmailWithCode.controller';
import { resetPasswordWithVerificationCodeController } from '../controllers/user/resetPasswordWithVerificationCode.controller';

export const userRouter: Router = Router();

//1.  Registro de usuário
userRouter.post(
  '',
  validateBodyMiddleware(userCreateSchema),
  verifyUserEmailExistsMiddleware,
  verifyCpfExistsMiddleware,
  createUserController
);

//2. Recuperar senha (e-mail com código para recuperação de senha)
userRouter.post('/resetPassword', sendEmailWithCodeController);

//3. Atualizar senha (código recebido por e-mail)
userRouter.patch('/resetPassword/:code', resetPasswordWithVerificationCodeController);

//4. Listagem de todos os usuários
userRouter.get('', readUsersController);

userRouter.use('/:id', verifyUserIdExistsMiddleware);

//5. User by id
userRouter.get(
  '/:id',
  validateTheUuidMiddleware,
  verifyTokenMiddleware,
  verifyUserIsOwnerMiddleware,
  readUserByIdController
);

//6. Update de usuário:
userRouter.patch(
  '/:id',
  validateBodyMiddleware(userUpdateSchema),
  verifyTokenMiddleware,
  validateTheUuidMiddleware,
  verifyUserIsOwnerMiddleware,
  updateUserController
);

//7. Delete user (sem soft remove):
userRouter.delete(
  '/:id',
  verifyTokenMiddleware,
  validateTheUuidMiddleware,
  verifyUserIsOwnerMiddleware,
  deleteUserController
);
