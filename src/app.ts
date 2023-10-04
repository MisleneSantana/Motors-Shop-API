import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import { handleError } from './middlewares/handleError.middleware';
import { userRouter } from './routers/user.routes';
import { sessionLoginRouter } from './routers/session.routes';
import { announcementRouter } from './routers/announcement.routes';
import { commentRouter } from './routers/comment.routes';

const app: Application = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Esta linha se refere ao middleware da DOC.

app.use('/users', userRouter);
app.use('/login', sessionLoginRouter);
app.use('/announcements', announcementRouter);
app.use('/comments', commentRouter);

app.use(handleError);

export default app;
