import express from 'express';
import { Controller } from './interfaces';
import cors from 'cors';

export default class App {
  app: express.Application;
  port: string | number;
 
  //Le pasamos los controllers asi cuando crea la instancia, los inicializa en el constructor con sus rutas get.
  constructor(controllers: Controller[], port: string | number) {
    this.app = express();
    this.app.use(cors());
    this.port = port;
 
    this.registerControllers(controllers);
  }
  

  private registerControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
  
  listen() {
    return this.app.listen(this.port, () => {
      console.log(`Listening at http://localhost:${this.port}/api`);
    });
  }
}