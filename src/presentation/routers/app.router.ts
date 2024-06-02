import { Router } from "express";
import { DataSourceRouter } from "./data-source.router";
import { EntityRouter } from "./entity.router";
import { RecordRouter } from "./record.router";

export class AppRouter {

  static get router(): Router {
    const router = Router();

    // set all the domain routes
    router.use('/api/data_source/', DataSourceRouter.router );
    router.use('/api/entity/', EntityRouter.router );
    router.use('/api/record/', RecordRouter.router );

    return router;
  }
}