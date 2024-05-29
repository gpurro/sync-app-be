import { Router } from "express";
import { DataSourceService } from "./data-source.service";
import { DataSourceController } from "./data-source.controller";

export class DataSourceRouter {

  static get router(): Router {
    
    const router = Router();

    const service = new DataSourceService();
    const controller = new DataSourceController(service);
    
    // set all the routes
    router.get( '/', controller.getAll );    
    router.post( '/', controller.create );

    return router;
  }
}