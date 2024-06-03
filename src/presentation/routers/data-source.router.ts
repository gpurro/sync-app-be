import { Router } from "express";
import { DataSourceService } from "@services";
import { DataSourceController } from "../controllers/data-source.controller";
import { DataSourceRepository } from "@repositories";

export class DataSourceRouter {

  static router(): Router {
    
    const router = Router();

    const repository = new DataSourceRepository();
    const service = new DataSourceService(repository);
    const controller = new DataSourceController(service);
    
    // set all the routes
    router.get( '/', controller.getAll );    
    router.post( '/', controller.create );

    return router;
  }
}