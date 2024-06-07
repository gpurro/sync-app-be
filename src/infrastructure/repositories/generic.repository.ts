import { GenericEntity } from '@entities';
import { type EntityClass, type IGeneric } from '@interfaces/entities';
import { type IGenericRepository, type IGetAllResponse } from '@interfaces/repositories';
import { CustomError } from 'domain/errors/custom.error';
import mongoose, { Model } from 'mongoose';

export abstract class GenericRepository<T extends IGeneric, E extends GenericEntity> implements IGenericRepository<E> {

  protected model: Model<T>;
  
  constructor(
    modelName: string,
    private Entity: EntityClass<E>,
  ) {
    this.model = mongoose.model<T>(modelName);
  }
  async create(entity: E): Promise<E> {
   
    try {
      const document = new this.model(entity.toObject());
      await document.save();
      const pojoDocument = document.toObject() as E; // cast the document to plain object to avoid mongoose methods and then cast to E
      return new this.Entity(pojoDocument);
    }
    catch ( error ) {
      throw CustomError.internalServer(`${ error }`);
    }     
  }

  async update(id:string, entity: E): Promise<E> {

    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async getOne(id: string): Promise<Record<string,any>|null> {

    const leanDocument = await this.model.findOne({ _id: id }).lean().exec();
    if (!leanDocument) return null;

    return leanDocument;
  }

  async getAll(queryOptions: Record<string, any>): Promise<IGetAllResponse> {
    
    try {

      const query = this.getNewQuery(queryOptions);

      const [total, leanDocuments] = await Promise.all([
        this.model.countDocuments(),
        query.exec()
      ]);

      return {
        total: total,
        data: leanDocuments
      };

    } catch ( error ) {
      throw CustomError.internalServer(`${ error }`);
    }  
  }

  private getNewQuery(queryOptions: Record<string, any>) {
    
    const query = this.model.find().lean();
    
    // Select
    query.select(queryOptions.select);
  
    // Sort
    query.sort(queryOptions.sort);
  
    // Pagination
    if (queryOptions.page) {
      query.skip(queryOptions.page.skip);
      query.limit(queryOptions.page.limit);
    }
  
    // Populate
    if (queryOptions.populate) {
      query.populate(queryOptions.populate);
    }

    return query;
  };

}
