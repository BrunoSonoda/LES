import { resolve } from 'path';

import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import clienteRoutes from './routes/clienteRoutes';
import cartaoRoutes from './routes/cartaoRoutes';
import enderecoRoutes from './routes/enderecoRoutes';

const whiteList = [
  'https://react1.BrunoSonoda.com.br',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(
      helmet({
        crossOriginResourcePolicy: false,
      }),
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      '/images',
      (req, res, next) => {
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        next();
      },
      express.static(resolve(__dirname, '..', 'uploads', 'images')),
    );
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/cliente/', clienteRoutes);
    this.app.use('/cartoes', cartaoRoutes);
    this.app.use('/enderecos', enderecoRoutes);
  }
}

export default new App().app;
