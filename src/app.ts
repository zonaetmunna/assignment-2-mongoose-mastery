/* eslint-disable no-console */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.routes';
const app: Application = express();

// application level middleware
app.use(cors());
app.use(express.json());

// api initial route
app.get('/', (req: Request, res: Response) => {
  console.log('Hello World!');
  res.json('Hello World!');
});

// api routes
app.use('/api/users', UserRoutes);

export default app;
