
export interface IGenericRepository<E> {
  create(entity: E): Promise<E>;
  update(id:string, entity: E): Promise<E>;
  delete(id: string): Promise<void>;
  getOne(id: string): Promise<Record<string,any>|null>;
  getAll(queryOptions: Record<string,any>): Promise<IGetAllResponse>;
}

export type IGetAllResponse = { 
  total: number, 
  data: Record<string,any>[]
};