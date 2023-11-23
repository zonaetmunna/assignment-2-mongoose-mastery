import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.routes';
const app: Application = express();

// application level middleware
app.use(cors());
app.use(express.json());

// api initialization
app.get('/', (req: Request, res: Response) => {
  // eslint-disable-next-line no-console
  console.log('Hello World!');
  res.json('Hello World!');
});

app.use('/api/users', UserRoutes);

export default app;
