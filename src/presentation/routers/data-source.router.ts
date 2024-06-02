import { Router } from "express";
import { DataSourceService } from "../../application/services/data-source.service";
import { DataSourceController } from "../controllers/data-source.controller";

export class DataSourceRouter {

  static router(): Router {
    
    const router = Router();

    const service = new DataSourceService();
    const controller = new DataSourceController(service);
    
    // set all the routes
    router.get( '/', controller.getAll );    
    router.post( '/', controller.create );

    return router;
  }
}