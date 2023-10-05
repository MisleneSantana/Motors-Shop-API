import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import { createTransport } from 'nodemailer';
import { TSendEmailRequest } from '../interfaces/sendEmail.interface';
import { AppError } from '../errors/error';

export const sendEmailNodemailer = async ({ subject, text, to }: TSendEmailRequest) => {
  const transporter = createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
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
      console.log('Email sended with success!');
    })
    .catch((err): any => {
      console.log(err);
      throw new AppError('Error sending email', 400);
    });
};
