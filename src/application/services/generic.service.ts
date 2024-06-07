import { GenericEntity, Pagination } from '@entities';
import { IGenericRepository } from "@interfaces/repositories";
import { PluginManager } from 'infrastructure/plugin-manager';
import { container } from 'tsyringe';
import JsonApiSerializer from "../../infrastructure/serializer/json-api-serializer";

export abstract class GenericService<E extends GenericEntity>{

  protected pluginManager: PluginManager;
  constructor(
    protected readonly repository: IGenericRepository<E> ,
    protected readonly resourceName: string,
  ) {
    this.pluginManager = container.resolve("PluginManager");
  }

  async create(genericEntity: E) {

    return this.repository.create(genericEntity);
  }
  
  async getOne(id:string): Promise<E|null> {

    return await this.repository.getOne(id);
  }

  async getAll(queryOptions: Record<string, any>, baseUrl: string, requestedUrl: string) {

    const result =  await this.repository.getAll(queryOptions);

    // Pagination links
    const pagination = new Pagination(queryOptions.page, result.total);
    var paginationLinks = pagination.getLinks(baseUrl, requestedUrl);

    // Extra options
    const extraOptions = {
        count: result.data.length,
        ...pagination,
        ...paginationLinks
    };

    // Serialize
    const response = JsonApiSerializer.serialize(this.resourceName, result.data, extraOptions)
    
    return response;    
  }  

}