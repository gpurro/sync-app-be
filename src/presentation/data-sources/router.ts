import { Router } from "express";
import { DataSourceService } from "./service";
import { DataSourceController } from "./controller";

export class DataSourceRouter {

  static get router(): Router {
    
    const router = Router();

    const service = new DataSourceService();
    const controller = new DataSourceController(service);
    
    // set all the DataSource routes
    router.get( '/', controller.getAll );    
    router.post( '/', controller.create );

    return router;
  }
}