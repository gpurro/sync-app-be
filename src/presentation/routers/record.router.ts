import { Router } from "express";
import { RecordService } from "@services";
import { RecordController } from "../controllers/record.controller";
import { RecordRepository } from "@repositories";

export class RecordRouter {

  static router(): Router {
    
    const router = Router();

    const repository = new RecordRepository();
    const service = new RecordService(repository);
    const controller = new RecordController(service);
    
    // set all the routes
    router.get( '/', controller.getAll);
    router.get( '/:id', controller.getOne); 
    router.post( '/', controller.create);

    return router;
  }
}