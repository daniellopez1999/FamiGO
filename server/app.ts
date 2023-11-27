import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './router';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);

export default app;
