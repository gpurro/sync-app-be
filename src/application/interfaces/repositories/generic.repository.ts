
export interface IGenericRepository<E> {
  create(entity: E): Promise<E>;
  update(id:string, entity: E): Promise<E>;
  delete(id: string): Promise<void>;
  getAll(queryOptions: Record<string,any>): Promise<IGetAllResponse>;
  getAllRelationship(id: string, relationshipName: string, relationshipType: string, relationshipRepository: IGenericRepository<any>, queryOptions: Record<string, any>): Promise<IGetAllResponse|Record<string, any>|null>
  findByIds(id: string[], queryOptions: Record<string, any>): Promise<IGetAllResponse>;
  findById(id: string, queryOptions?: Record<string, any>): Promise<Record<string, any>|null>;}

export type IGetAllResponse = { 
  total: number, 
  data: Record<string,any>[]
};