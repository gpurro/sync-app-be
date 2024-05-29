import { Router } from "express";
import { EntityService } from "./service";
import { EntityController } from "./controller";

export class EntityRouter {

  static get router(): Router {
    
    const router = Router();

    const service = new EntityService();
    const controller = new EntityController(service);
    
    // set all the DataSource routes
    router.get( '/', controller.getAll );    
    router.post( '/', controller.create );

    return router;
  }
}