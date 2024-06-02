import { Router } from "express";
import { RecordService } from "../../application/services/record.service";
import { RecordController } from "../controllers/record.controller";

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