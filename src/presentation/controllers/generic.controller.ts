
import { Response, Request } from 'express';
import { GenericEntity } from '@entities';
import { GenericService } from '@services';
import { Validators } from '@config';
import { CustomError } from 'domain/errors/custom.error';
import { EntityClass } from '@interfaces/entities';
import jsonApiMongoParser from 'infrastructure/jsonApiMongoParser/json-api-mongo-parser';
import { IGenericRepository } from '@interfaces/repositories';

export abstract class GenericController <E extends GenericEntity> {

  public validateCreateOperation?: (data: Record<string, unknown>) => Promise<void>;

  constructor(
    public readonly resourceName: string,
    public readonly service: GenericService<E>,
    private Entity: EntityClass<E>,
  ) {}

  protected handleError = ( error: unknown, res: Response ) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${ error }`);
    return res.status(500).json({ error: `Internal server error in ${ this.resourceName }` });
  };

  create = async ( req: Request, res: Response ) => {

    if (this.validateCreateOperation) { 
      try {
        await this.validateCreateOperation(req.body);
      } catch (error) {
        return this.handleError(error, res);
      }
    }
    const entityEntity = new this.Entity(req.body);

    this.service.create(entityEntity!)
      .then( entity => res.status(201).json(entity) )
      .catch( error => this.handleError(error, res) );
  };

  getAll = async (
    req: Request<any, any, any, { page: {} }>, 
    res: Response) => {

    const url = new URL(req.originalUrl, `${req.protocol}://${req.hostname}`);

    const pagination = {
      offset: 0,
      limit: 10,
      ...req.query.page
    };
    const queryOptions = { 
      ...jsonApiMongoParser.parse(this.resourceName, req.query), 
      page: { 
        ...pagination
      }
    };

    this.service.getAll(queryOptions, url)
      .then( result => res.json(result))
      .catch(error => this.handleError(error, res));    
  };

  getOne = async (req: Request, res: Response) => {

    const url = new URL(req.originalUrl, `${req.protocol}://${req.hostname}`);
    const id = req.params.id;
   
    if (!Validators.isMongoID(id)) return res.status(400).json({ error: 'Received Id is not an ObjectID' });
    
    this.service.getOne(id, url)
      .then( result => res.json(result))
      .catch(error => this.handleError(error, res));
  };

  getAllRelationship = (relationshipName: string, relationshipType: string, relationshipRepository: IGenericRepository<any> ) => {
  
    return async (
        req: Request<any, any, any, { page: {} }>, 
        res: Response) => {

        const url = new URL(req.originalUrl, `${req.protocol}://${req.hostname}`);
        const id = req.params.id;
   
        if (!Validators.isMongoID(id)) return res.status(400).json({ error: 'Received Id is not an ObjectID' });

        const pagination = {
          offset: 0,
          limit: 10,
          ...req.query.page
        };
        const queryOptions = { 
          ...req.query,
          page: { 
            ...pagination
          }
        };

        this.service.getAllRelationship(id, relationshipName, relationshipType, relationshipRepository, queryOptions, url)
          .then( result => res.json(result))
          .catch(error => this.handleError(error, res));    
      };  
    };

    getRelationship = (relationshipName: string) => {
  
      return async (
        req: Request<any, any, any, { page: {} }>, 
        res: Response
      ) => {

        const id = req.params.id;
        if (!Validators.isMongoID(id)) return res.status(400).json({ error: 'Received Id is not an ObjectID' });

        const url = new URL(req.originalUrl, `${req.protocol}://${req.hostname}`);

        const pagination = {
          offset: 0,
          limit: 10,
          ...req.query.page
        };
        const queryOptions = { 
          ...jsonApiMongoParser.parse(this.resourceName, req.query), 
          page: { 
            ...pagination
          }
        };        
       
        this.service.getRelationship(id, queryOptions, url, relationshipName)
          .then( result => res.json(result))
          .catch(error => this.handleError(error, res));
      }
    }
  }