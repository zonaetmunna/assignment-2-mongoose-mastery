import express from 'express';
import cors from 'cors';
const app = express();

// application level middleware
app.use(cors());
app.use(express.json());

export default app;
