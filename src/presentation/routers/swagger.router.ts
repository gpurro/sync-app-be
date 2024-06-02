import { Router } from "express";
import { swaggerSpec } from '../../infrastructure/swagger';
import swaggerUi from 'swagger-ui-express';

export class SwaggerRouter {

  static router(): Router {
    
    const router = Router();

    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    
    // Documentation in JSON format
    router.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    });

    return router;
  }
}