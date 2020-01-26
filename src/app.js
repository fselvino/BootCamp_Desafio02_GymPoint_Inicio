import express from 'express';
import routes from './routes';

// importa o arquivo index que esta na pasta database referenciada
import './database';

// class de entrada do sistema
class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
  }

  // possibilita trabalhar com json
  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}
export default new App().server;
