
import { Response, Request } from 'express';
import { GenericEntity, Pagination } from '@entities';
import { GenericService } from '@services';
import { Validators } from '@config';
import { CustomError } from 'domain/errors/custom.error';
import { EntityClass } from '@interfaces/entities';
import jsonApiMongoParser from 'infrastructure/jsonApiMongoParser/json-api-mongo-parser';
import { IGenericRepository } from '@interfaces/repositories';
import jsonApiSerializer from '../../infrastructure/serializer/json-api-serializer';

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
    const url = new URL(req.originalUrl, `${req.protocol}://${req.hostname}`);

    try {
      const leanDocument = await this.service.create(entityEntity!);
      const baseApiUrl = `${url.protocol}//${url.hostname}/api`;
  
      const extraOptions = {
        self: url.toString(),
        baseApiUrl
      };
  
      const responseData = jsonApiSerializer.serialize(this.resourceName, leanDocument, extraOptions);
  
      res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
      res.status(201).json(responseData);

    } catch (error) {
      this.handleError(error, res)
    }
  };
  
  getOne = async (req: Request, res: Response) => {

    const url = new URL(req.originalUrl, `${req.protocol}://${req.hostname}`);
    const id = req.params.id;
    
    if (!Validators.isMongoID(id)) return res.status(400).json({ error: 'Received Id is not an ObjectID' });

    try {
      const leanDocument = await this.service.getOne(id);
      const baseApiUrl = `${url.protocol}//${url.hostname}/api`;
  
      const extraOptions = {
        self: url.toString(),
        baseApiUrl
      };
      
      const responseData = jsonApiSerializer.serialize(this.resourceName, leanDocument, extraOptions);
    
      res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
      res.json(responseData);
    } catch (error) {
      this.handleError(error, res)
    }
  };
  
  getAll = async (
    req: Request<any, any, any, { page: {} }>, 
    res: Response) => {

    const url = new URL(req.originalUrl, `${req.protocol}://${req.hostname}`);

    const effectivePagination = {
      offset: 0,
      limit: 10,
      ...req.query.page
    };
    const queryOptions = { 
      ...jsonApiMongoParser.parse(this.resourceName, req.query), 
      page: { 
        ...effectivePagination
      }
    };

    try {
      const getAllResponse = await this.service.getAll(queryOptions);
      const baseApiUrl = `${url.protocol}//${url.hostname}/api`;
  
      // Pagination links
      const pagination = new Pagination(queryOptions.page, getAllResponse.total);
      const paginationLinks = pagination.getLinks(url);
  
      // Extra options
      const extraOptions = {
          count: getAllResponse.data.length,
          ...pagination,
          ...paginationLinks,
          baseApiUrl
      };
  
      // Serialize
      const responseData = jsonApiSerializer.serialize(this.resourceName, getAllResponse.data, extraOptions);
      
      res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
      res.json(responseData);
      
    } catch (error) {
      this.handleError(error, res)
    }
  };

  getAllRelationship = (relationshipName: string, relationshipType: string, relationshipRepository: IGenericRepository ) => {
  
    return async (
        req: Request<any, any, any, { page: {} }>, 
        res: Response
      ) => {

        const url = new URL(req.originalUrl, `${req.protocol}://${req.hostname}`);
        const id = req.params.id;
    
        if (!Validators.isMongoID(id)) return res.status(400).json({ error: 'Received Id is not an ObjectID' });

        const effectivePagination = {
          offset: 0,
          limit: 10,
          ...req.query.page
        };
        const queryOptions = { 
          ...req.query,
          page: { 
            ...effectivePagination
          }
        };

        try {
          const result = await this.service.getAllRelationship(id, relationshipName, relationshipType, relationshipRepository, queryOptions);
          const baseApiUrl = `${url.protocol}//${url.hostname}/api`;
  
          let responseData = null;
          let extraOptions = {
            self: url.toString(),
            baseApiUrl
          } as any;
  
          // To many relationships?
          if (result?.data) { 
      
            // Pagination links
            const pagination = new Pagination(queryOptions.page, result.total);
            const paginationLinks = pagination.getLinks(url);
      
            // Extra options
            extraOptions = {
                ...extraOptions,
                count: result.data.length,
                ...pagination,
                ...paginationLinks,
            };
            responseData = jsonApiSerializer.serialize(relationshipType, result.data, extraOptions);
          }
          else {
            // To one relationship
            responseData = jsonApiSerializer.serialize(relationshipType, result, extraOptions);
          }
        
          res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
          res.json(responseData);

        } catch (error) {
          this.handleError(error, res)
        }
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
       
        try {
          const leanDocument = await this.service.getOne(id, queryOptions);
          const baseApiUrl = `${url.protocol}//${url.hostname}/api`;
  
          const extraOptions = {
            self: url.toString(),
            baseApiUrl
          } as any;
      
          // serialized document
          const serializedData = jsonApiSerializer.serialize(this.resourceName, leanDocument, extraOptions);
      
          // serialized relationship
          const serializedRelationship = serializedData.data.relationships[relationshipName];
      
          // response
          let responseData = {
            ...serializedData.jsonapi,
          };
          
          // meta
          if (Array.isArray(serializedRelationship.data)) {
            responseData.meta = {
              count: serializedRelationship.data.length
            }
          }
      
          // links + data
          responseData = {
            ...responseData,
            ...serializedRelationship
          };
      
          res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
          res.json(responseData);

        } catch (error) {
          this.handleError(error, res)
        }
      }
    }
  }