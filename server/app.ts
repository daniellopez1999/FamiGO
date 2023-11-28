import express from 'express';
import router from './router';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// app.use((req, _res, next) => {
//   console.log(`Received request: ${req.method} ${req.path}`);
//   next();
// });

app.use(router);

export default app;
