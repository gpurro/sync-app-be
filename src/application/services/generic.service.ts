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
  
  async getOne(id:string, url: URL): Promise<Record<string, any>|null> {
    
    const document = await this.repository.getOne(id);
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

}