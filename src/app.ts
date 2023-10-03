import 'express-async-errors';
import 'reflect-metadata';
import express, { Application } from 'express';
import { userRouter } from './routers/user.routes';
import { handleError } from './middlewares/handleError.middleware';
import { sessionLoginRouter } from './routers/session.routes';
import { announcementRouter } from './routers/announcement.routes';
import { commentRouter } from './routers/comment.routes';
import { sendEmailRouter } from './routers/sendEmail.routes';

const app: Application = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/login', sessionLoginRouter);
app.use('/announcements', announcementRouter);
app.use('/comments', commentRouter);
app.use('/email', sendEmailRouter);

app.use(handleError);

export default app;
