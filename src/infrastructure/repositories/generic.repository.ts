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
  async create(entity: E): Promise<Record<string, any>> {
   
    let document;

    try {
      document = new this.model(entity.toObject());
      document = await document.save();
      const leanDocument = await this.findById(document.id);
      if (!leanDocument) throw new Error('Error saving document');
      return leanDocument;
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

  async getAllRelationship(id: string, relationshipName: string, relationshipType: string, relationshipRepository: IGenericRepository<any>, queryOptions: Record<string, any>): Promise<IGetAllResponse|Record<string, any>|null> {
    
    try {
      const leanDocument = await this.model.findById(id).lean().exec() as any;
            
      const relationshipId = (
        leanDocument[relationshipName] instanceof mongoose.Types.ObjectId ? 
        leanDocument[relationshipName].toString() :
        leanDocument[relationshipName]
      );

      if (Array.isArray(relationshipId)) { 
        return await relationshipRepository.findByIds(relationshipId, queryOptions);
      }
      else {
        return await relationshipRepository.findById(relationshipId, queryOptions);
      }
    } catch ( error ) {
      throw CustomError.internalServer(`${ error }`);
    }  
  } 

  async findByIds(ids: string[], queryOptions: Record<string, any>): Promise<IGetAllResponse> {
      
    try {
      const conditions = { _id: { $in: ids } };
      const query = this.model.find(conditions).lean();
  
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
  
      const [total, leanDocuments] = await Promise.all([
        this.model.countDocuments(conditions),
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

  async findById(id: string, queryOptions: Record<string, any>={}): Promise<Record<string, any>|null> {
      
    try {
      const query = this.model.findById(id).lean();
  
      // Select
      query.select(queryOptions.select);
    
      // Populate
      if (queryOptions.populate) {
        query.populate(queryOptions.populate);
      }
  
      return await query.exec();
    } catch ( error ) {
      throw CustomError.internalServer(`${ error }`);
    }  
  }
}

