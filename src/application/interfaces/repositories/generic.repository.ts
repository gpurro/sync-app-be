import { PaginationEntity } from "@entities";

export interface IGenericRepository<E> {
  create(entity: E): Promise<E>;
  update(id:string, entity: E): Promise<E>;
  delete(id: string): Promise<void>;
  getOne(id: string): Promise<E|null>;
  getAll(paginationEntity: PaginationEntity): Promise<IGetAllResponse<E>>;
}

export type IGetAllResponse<E> = { 
  page: number, 
  limit: number, 
  total: number, 
  data: E[] 
};