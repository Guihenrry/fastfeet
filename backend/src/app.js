import 'dotenv/config';
import Youch from 'youch';
import cors from 'cors';

import express from 'express';
import { resolve } from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const erros = await new Youch(err, req).toJSON();

        return res.status(500).json(erros);
      }

      return res.status(500).json({ error: 'Iternal server error' });
    });
  }
}

export default new App().server;
