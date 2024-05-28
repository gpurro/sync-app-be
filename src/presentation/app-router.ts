import { Router } from "express";
import { DataSourceRouter } from "./data-sources/router";

export class AppRouter {

  static get router(): Router {
    const router = Router();

    // set all the domain routes
    // router.use('/api/books', BooksRouter.router );
    router.use('/api/data_source/', DataSourceRouter.router );

    return router;
  }
}