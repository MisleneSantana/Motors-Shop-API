import 'express-async-errors';
import 'reflect-metadata';
import express, { Application } from 'express';
import { userRouter } from './routers/user.routes';
import { handleError } from './middlewares/handleError.middleware';
import { sessionLoginRouter } from './routers/session.routes';

const app: Application = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/login', sessionLoginRouter);

app.use(handleError);

export default app;
