import { Router } from "express";
import { DataSourceRouter } from "./data-sources/data-source.router";
import { EntityRouter } from "./entities/entity-router";

export class AppRouter {

  static get router(): Router {
    const router = Router();

    // set all the domain routes
    router.use('/api/data_source/', DataSourceRouter.router );
    router.use('/api/entity/', EntityRouter.router );

    return router;
  }
}