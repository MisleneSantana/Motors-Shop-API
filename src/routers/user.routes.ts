import { Router } from 'express';
import { createUserController } from '../controllers/users/user.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { userCreateSchema } from '../schemas/user.schema';
import { verifyUserEmailExistsMiddleware } from '../middlewares/user/verifyUserEmailExists.middleware';
import { verifyCpfExistsMiddleware } from '../middlewares/user/verifyCpfExists.middleware';

export const userRouter: Router = Router();

// Endpoints:
// 1. Registro de usuário:
userRouter.post(
  '',
  validateBodyMiddleware(userCreateSchema),
  verifyUserEmailExistsMiddleware,
  verifyCpfExistsMiddleware,
  createUserController
);
