
export type LeanObject = Record<string, any>;

export interface IGenericRepository {
  create(leanDocument: LeanObject): Promise<LeanObject> ;
  update(id:string, leanDocument: LeanObject): Promise<LeanObject>;
  delete(id: string): Promise<void>;
  getAll(queryOptions: LeanObject): Promise<IGetAllResponse>;
  getAllRelationship(id: string, relationshipName: string, relationshipType: string, relationshipRepository: IGenericRepository, queryOptions: LeanObject): Promise<IGetAllResponse|LeanObject|null>
  findByIds(id: string[], queryOptions: LeanObject): Promise<IGetAllResponse>;
  findById(id: string, queryOptions?: LeanObject): Promise<LeanObject|null>;}

export type IGetAllResponse = { 
  total: number, 
  data: LeanObject[]
};