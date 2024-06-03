import { CustomError } from "domain/errors/custom.error";
import { GenericModel } from "../../infrastructure";
import { PaginationEntity, GenericEntity } from '@entities';
import { IGenericRepository } from "@interfaces/repositories";
import { IGeneric } from "@interfaces/entities";

export abstract class GenService<T extends IGeneric, E extends GenericEntity>{

  constructor(
    protected readonly resourceName: string,
    protected readonly repository: IGenericRepository<T, E> ,
  ) {
  }

  async create(genericEntity: T) {

    return this.repository.create(genericEntity);
  }
  
  async getOne(id:string): Promise<E|null> {

    return await this.repository.getById(id);
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