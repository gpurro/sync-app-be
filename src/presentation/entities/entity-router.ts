import { Router } from "express";
import { EntityService } from "./entity-service";
import { EntityController } from "./entity-controller";

export class EntityRouter {

  static get router(): Router {
    
    const router = Router();

    const service = new EntityService();
    const controller = new EntityController(service);
    
    // set all the routes
    router.get( '/', controller.getAll); 
    router.post( '/', controller.create);
    router.get( '/:id', controller.getOne); 
    router.get( '/:id/initialize', controller.initializeRecords );

    return router;
  }
}