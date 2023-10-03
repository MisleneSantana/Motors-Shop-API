import 'dotenv/config';
import { createTransport } from 'nodemailer';
import { TSendEmailRequest } from '../interfaces/sendEmail.interface';
import { AppError } from '../errors/error';

export const sendEmailNodemailer = async ({ subject, text, to }: TSendEmailRequest) => {
  const transporter = createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: text,
    })
    .then(() => {
      console.log('Email send with success');
    })
    .catch((err): any => {
      console.log(err);
      throw new AppError('Error sending email, try again later', 400);
    });
};
