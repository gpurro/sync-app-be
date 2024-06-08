import { Router } from "express";
import { RecordService } from "@services";
import { RecordController } from "../controllers/record.controller";
import { EntityRepository, RecordRepository } from "@repositories";

export class RecordRouter {

  static router(): Router {
    
    const router = Router();

    const repository = new RecordRepository();
    const service = new RecordService(repository);
    const controller = new RecordController(service);
    
    // set all the routes
    router.get( '/', controller.getAll);
    router.post( '/', controller.create);
    router.get( '/:id', controller.getOne); 
    // router.patch( '/:id', controller.update); 
    // router.delete( '/:id', controller.delete); 

    // entity relationship
    const entityRepository = new EntityRepository();
    router.get( '/:id/entity', controller.getAllRelationship('entity', 'entity', entityRepository)); 
    // router.get( '/:id/relationships/entity', controller.getRelationship); 

    // relationships
    // router.patch( '/:id/relationships/:relationship', controller.updateRelationship); 
    // router.post( '/:id/relationships/:relationship', controller.createRelationship); 
    // router.delete( '/:id/relationships/:relationship', controller.deleteRelationship); 

    return router;
  }
}