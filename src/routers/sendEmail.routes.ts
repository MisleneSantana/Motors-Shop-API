import { Router } from 'express';
import { sendEmailController } from '../controllers/user/sendEmail.controller';

export const sendEmailRouter: Router = Router();

sendEmailRouter.post('', sendEmailController);
