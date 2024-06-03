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

  async create(genericEntityEntity: GenericEntity) {

    // const documentExists = await this.repository.findOne({ name: genericEntityEntity.name });
    // if (documentExists) throw CustomError.badRequest( 'Document already exists with the same name' );

    // try {
    //   const document = new this.genericModel( {
    //     ...genericEntityEntity,
    //     // user: user.id,
    //   } );

    //   await document.save();

    //   return document.toObject();

    // } catch ( error ) {
    //   throw CustomError.internalServer(`${ error }`);
    // }    
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