import { GenericEntity, PaginationEntity } from '@entities';
import { type EntityClass, type IGeneric } from '@interfaces/entities';
import { type IGenericRepository, type IGetAllResponse } from '@interfaces/repositories';
import { CustomError } from 'domain/errors/custom.error';
import mongoose, { Model } from 'mongoose';

export abstract class GenericRepository<T extends IGeneric, E extends GenericEntity> implements IGenericRepository<E> {

  protected model: Model<T>;

  constructor(
    modelName: string,
    private Entity: EntityClass<T, E>,
  ) {
    this.model = mongoose.model<T>(modelName);
  }
  async create(entity: E): Promise<E> {
   
    try {
      const document = new this.model(entity.toObject());
      await document.save();
      const [error, createdEntity] = this.Entity.createFromObject(document.toObject());
      if (error) throw CustomError.badRequest(error);
      return createdEntity as E;

    } catch ( error ) {
      throw CustomError.internalServer(`${ error }`);
    }     
  }

  async update(id:string, entity: E): Promise<E> {

    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async getById(id: string): Promise<E|null> {
    const document = await this.model.findOne({ _id: id }).exec();
    
    if (!document) return null;

    const [error, entity] = this.Entity.createFromObject(document.toObject());
    if (error) throw CustomError.badRequest(error);
    return entity!
  }
  
  async getAll(paginationEntity: PaginationEntity): Promise<IGetAllResponse<E>> {
    
    const { page, limit } = paginationEntity;

    try {

      const [total, documents] = await Promise.all([
        this.model.countDocuments(),
        this.model.find()
          .skip((page - 1) * limit)
          .limit(limit)
      ]);
      const entities = documents.map( document => { 
        const [error, entity] = this.Entity.createFromObject(document.toObject());
        if (error) throw CustomError.badRequest(error);
        return entity!
      });

      return {
        page,
        limit,
        total,
        data: entities
      };

    } catch ( error ) {
      throw CustomError.internalServer(`${ error }`);
    }  
  } 

}
