import { z } from 'zod';
import { userSendEmailRequest } from '../schemas/sendEmail.schema';

export type TSendEmailRequest = z.infer<typeof userSendEmailRequest>;
