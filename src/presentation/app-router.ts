import { Router } from "express";
import { DataSourceRouter } from "./data-sources/router";
import { EntityRouter } from "./entities/router";

export class AppRouter {

  static get router(): Router {
    const router = Router();

    // set all the domain routes
    router.use('/api/data_source/', DataSourceRouter.router );
    router.use('/api/entity/', EntityRouter.router );

    return router;
  }
}