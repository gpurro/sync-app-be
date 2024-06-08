import { GenericEntity, Pagination } from '@entities';
import { IGenericRepository } from "@interfaces/repositories";
import { PluginManager } from 'infrastructure/plugin-manager';
import { container } from 'tsyringe';
import JsonApiSerializer from "../../infrastructure/serializer/json-api-serializer";
import jsonApiSerializer from '../../infrastructure/serializer/json-api-serializer';

export abstract class GenericService<E extends GenericEntity>{

  protected pluginManager: PluginManager;

  constructor(
    protected readonly repository: IGenericRepository<E> ,
    protected readonly resourceName: string,
  ) {
    this.pluginManager = container.resolve("PluginManager");
  }

  async create(genericEntity: E): Promise<Record<string, any>>{

    return this.repository.create(genericEntity);
  }
  
  async getOne(id:string, url: URL): Promise<Record<string, any>|null> {
    
    const document = await this.repository.findById(id);
    const baseApiUrl = `${url.protocol}//${url.hostname}/api`;

    const extraOptions = {
      self: url.toString(),
      baseApiUrl
    };

    return JsonApiSerializer.serialize(this.resourceName, document, extraOptions)
  }

  async getAll(queryOptions: Record<string, any>, url: URL): Promise<Record<string, any>> {

    const result =  await this.repository.getAll(queryOptions);
    const baseApiUrl = `${url.protocol}//${url.hostname}/api`;

    // Pagination links
    const pagination = new Pagination(queryOptions.page, result.total);
    const paginationLinks = pagination.getLinks(url);

    // Extra options
    const extraOptions = {
        count: result.data.length,
        ...pagination,
        ...paginationLinks,
        baseApiUrl
    };

    // Serialize
    return JsonApiSerializer.serialize(this.resourceName, result.data, extraOptions)
  } 

  async getAllRelationship(id: string, relationshipName: string, relationshipType: string, relationshipRepository: IGenericRepository<any>, queryOptions: Record<string, any>, url: URL): Promise<Record<string, any>> {

    const result =  await this.repository.getAllRelationship(id, relationshipName, relationshipType, relationshipRepository, queryOptions);
    const baseApiUrl = `${url.protocol}//${url.hostname}/api`;

    let serializedData = null;
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

      serializedData = JsonApiSerializer.serialize(relationshipType, result.data, extraOptions);
    }
    else {
      // To one relationship
      serializedData = JsonApiSerializer.serialize(relationshipType, result, extraOptions);
    }

    return serializedData;
  }

  async getRelationship(id:string, queryOptions: Record<string, any>, url: URL, relationshipName: string): Promise<Record<string, any>|null> {
    
    const document = await this.repository.findById(id, queryOptions);

    const baseApiUrl = `${url.protocol}//${url.hostname}/api`;
    const extraOptions = {
      self: url.toString(),
      baseApiUrl
    } as any;

    // serialized document
    const serializedData = jsonApiSerializer.serialize(this.resourceName, document, extraOptions);

    // serialized relationship
    const serializedRelationship = serializedData.data.relationships[relationshipName];

    // response
    let response = {
      ...serializedData.jsonapi,
    };
    
    // meta
    if (Array.isArray(serializedRelationship.data)) {
      response.meta = {
        count: serializedRelationship.data.length
      }
    }

    // links + data
    response = {
      ...response,
      ...serializedRelationship
    };

    return response;
  }  

}