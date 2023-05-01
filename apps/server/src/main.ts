/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import App from './app'; // app con la configuración adecuada (constructor con el registro de los controllers)

import { Router } from 'express';

//Importamos el controlador a utilizar
import { ItemsController } from './controllers/ItemsController';

import { SearchItems, GetItem } from './models/items';

const port = process.env.PORT || 3333;
const router = Router();

//Le pasamos el ItemsController con el router y las clases para poder eejcutar los metodos y devolver la info filtrada.
const app = new App( 
  [
    new ItemsController(
      router,
      new SearchItems(),
      new GetItem(),
    ),
  ],
  port
);


//listen() queda implementado dentro de App para simplificar.
const server = app.listen();
server.on('error', console.error);
