import { GenericEntity, Pagination } from '@entities';
import { IGenericRepository, IGetAllResponse, LeanObject } from "@interfaces/repositories";
import { PluginManager } from 'infrastructure/plugin-manager';
import { container } from 'tsyringe';
import JsonApiSerializer from "../../infrastructure/serializer/json-api-serializer";
import jsonApiSerializer from '../../infrastructure/serializer/json-api-serializer';

export abstract class GenericService<E extends GenericEntity>{

  protected pluginManager: PluginManager;

  constructor(
    protected readonly repository: IGenericRepository ,
    protected readonly resourceName: string,
  ) {
    this.pluginManager = container.resolve("PluginManager");
  }

  async create(genericEntity: E): Promise<LeanObject>{

    return this.repository.create(genericEntity);
  }
  
  async getOne(id:string, queryOptions: LeanObject={}): Promise<LeanObject|null> {
    
    return await this.repository.findById(id, queryOptions);
  }

  async getAll(queryOptions: LeanObject): Promise<IGetAllResponse> {

    return await this.repository.getAll(queryOptions);
  } 

  async getAllRelationship(id: string, relationshipName: string, relationshipType: string, relationshipRepository: IGenericRepository, queryOptions: LeanObject): Promise<LeanObject|IGetAllResponse|null> {

    return await this.repository.getAllRelationship(id, relationshipName, relationshipType, relationshipRepository, queryOptions);
  }

}