import { Request, Response } from 'express';
import { TSendEmailRequest } from '../../interfaces/sendEmail.interface';
import { sendEmailNodemailer } from '../../utils/nodemailer.util';

// No momento este controller não está sendo utilizado.
export const sendEmailController = async (req: Request, res: Response) => {
  try {
    const { subject, text, to }: TSendEmailRequest = req.body;

    await sendEmailNodemailer({ subject, text, to });
    return res
      .json({
        message: 'Email sended with success!',
      })
      .status(200);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
