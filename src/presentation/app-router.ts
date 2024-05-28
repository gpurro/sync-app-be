import { Router } from "express";

export class AppRouter {

  static get router(): Router {
    const router = Router();

    // set all the domain routers
    // router.use('/api/books', BooksRouter.router );

    return router;
  }
}