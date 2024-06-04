import { PaginationEntity, GenericEntity } from '@entities';
import { IGenericRepository } from "@interfaces/repositories";
import { PluginManager } from 'infrastructure/plugin-manager';
import { container } from 'tsyringe';

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

  async getAll(paginationEntity: PaginationEntity) {

    const { page, limit } = paginationEntity;

    const getAllResponse =  await this.repository.getAll(paginationEntity);
    
    return { 
      ...getAllResponse,
      next: `/api/${ this.resourceName }?page=${ (page + 1) }&limit=${ limit }`,
      prev: (page - 1 > 0) ? `/api/${ this.resourceName }?page=${ (page - 1) }&limit=${ limit }`: null,
    };    
  }

}