import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import userRouter from './routes/user.routes';
import loginRouter from './routes/login.routes';
import errorHandler from './middleware/errors';
import swaggerDocument from '../swagger.json';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use(errorHandler);

export default app;
