import { Router } from "express";
import { RecordService } from "./record.service";
import { RecordController } from "./record.controller";

export class RecordRouter {

  static get router(): Router {
    
    const router = Router();

    const service = new RecordService();
    const controller = new RecordController(service);
    
    // set all the routes
    router.get( '/', controller.getAll);
    router.post( '/', controller.create);

    return router;
  }
}