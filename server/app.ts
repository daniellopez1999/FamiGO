import express from 'express';
const app = express();
import router from './router';
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(router);

export default app;
