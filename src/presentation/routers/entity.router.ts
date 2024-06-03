import { Router } from "express";
import { EntityService } from "@services";
import { EntityController } from "../controllers/entity.controller";
import { EntityRepository } from "@repositories";

export class EntityRouter {

  static router(): Router {
    
    const router = Router();

    const repository = new EntityRepository();
    const service = new EntityService(repository);
    const controller = new EntityController(service);
    
    // set all the routes

    /**
     * @openapi
     * '/api/entity':
     *  get:
     *     tags:
     *     - Entity Controller
     *     summary: Get all the entities
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    router.get( '/', controller.getAll);

    /**
     * @openapi
     * '/api/entity':
     *  post:
     *     tags:
     *     - Entity Controller
     *     summary: Create an entity
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - name
     *              - dataSource
     *              - apiResourceName
     *            properties:
     *              name:
     *                type: string
     *                default: group 
     *              dataSource:
     *                type: string
     *              apiResourceName:
     *                type: string
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */    
    router.post( '/', controller.create);

    /**
     * @openapi
     * '/api/entity/{entity_id}':
     *  get:
     *     tags:
     *     - Entity Controller
     *     summary: Get an entity by id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the entity
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    router.get( '/:id', controller.getOne); 
    router.get( '/:id/initialize', controller.initializeRecords );

    return router;
  }
}