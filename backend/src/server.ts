import 'reflect-metadata';

import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import './database';
import {routes} from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      stack: err.stack,
    });
  }
  return response.status(500).json({
    status: 'internal error',
    message: err.message,
    stack: err.stack,
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🖥  🏃 on 🚪 3333');
});