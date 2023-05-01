//todo: probar el get de search api/items?q=:query (Pronto OK).
//todo probar el get de getItemDetails ejemplo: https://localhost:3333/api/items/MLA1131359154 ().
import {
    Request,
    Response,
    Router
  } from 'express';
  
  import { Controller } from '../interfaces';

  import {
    GetItem,
    SearchItems
  } from '../models/items';


  export class ItemsController implements Controller {
  
    get router(): Router {
      return this._router;
    }
    
    constructor(
      private _router: Router,
      private searchItems: SearchItems,
      private getItem: GetItem,
    ) {
      this.registerRoutes();
    }
  
    registerRoutes() {
      this.router.get('/items', this.search);
      this.router.get('/items/:id', this.getItemDetails);
    }
    
    //Implementacion para obtener resultados dada una búsqueda con "q?=xxxx"
    search = async (req: Request, resp: Response) => {
      const query = req.query.q as string;
    
      try {
        const result = await this.searchItems.execute(query);
        resp.send(result);
    
      } catch (error) {
        resp.status(error.response?.status ?? 404).send({
          message: error.response?.data?.message ?? error.message
        });
      }
    }
  
    getItemDetails = async (req: Request, resp: Response) => {
      const { id } = req.params;
    
      try {
        const result = await this.getItem.execute(id);
        resp.send(result);
    
      } catch (error) {
        resp.status(404).send({
          message: `Item id ${id} no encontrado, vuelva a buscar`
        });
      }
    }
  }