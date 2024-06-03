import { type IGeneric } from '@interfaces/entities';
import { IGenericRepository } from '@interfaces/repositories';

export abstract class GenericRepository<T extends IGeneric> implements IGenericRepository<T> {
  create(entity: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(entity: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  } 

}
