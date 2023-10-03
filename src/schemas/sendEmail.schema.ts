import { z } from 'zod';

export const userSendEmailRequest = z.object({
  to: z.string(),
  subject: z.string(),
  text: z.string(),
});
