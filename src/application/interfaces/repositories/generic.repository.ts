
export type LeanObject = Record<string, any>;

export interface IGenericRepository<E> {
  create(entity: E): Promise<LeanObject> ;
  update(id:string, entity: E): Promise<E>;
  delete(id: string): Promise<void>;
  getAll(queryOptions: LeanObject): Promise<IGetAllResponse>;
  getAllRelationship(id: string, relationshipName: string, relationshipType: string, relationshipRepository: IGenericRepository<any>, queryOptions: LeanObject): Promise<IGetAllResponse|LeanObject|null>
  findByIds(id: string[], queryOptions: LeanObject): Promise<IGetAllResponse>;
  findById(id: string, queryOptions?: LeanObject): Promise<LeanObject|null>;}

export type IGetAllResponse = { 
  total: number, 
  data: LeanObject[]
};