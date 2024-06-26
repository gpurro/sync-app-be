import { Router } from "express";
import { DataSourceRouter } from "./data-source.router";
import { EntityRouter } from "./entity.router";
import { RecordRouter } from "./record.router";
import { SwaggerRouter } from "./swagger.router";

export interface IRouterOptions {
  swagger: { 
    enabled: boolean 
  }
}

export class AppRouter {

  static router(routerOptions: IRouterOptions): Router {

    const router = Router();

    // set all the domain routes
    router.use('/api/data_source/', DataSourceRouter.router());
    router.use('/api/entity/', EntityRouter.router());
    router.use('/api/record/', RecordRouter.router());

    routerOptions.swagger.enabled && router.use(SwaggerRouter.router());
    
    return router;
  }
}