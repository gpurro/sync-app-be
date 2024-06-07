
export interface IGenericRepository<E> {
  create(entity: E): Promise<E>;
  update(id:string, entity: E): Promise<E>;
  delete(id: string): Promise<void>;
  getOne(id: string): Promise<E|null>;
  getAll(queryOptions: Record<string,any>): Promise<IGetAllResponse<E>>;
}

export type IGetAllResponse<E> = { 
  total: number, 
  data: Record<string,any>[]
};