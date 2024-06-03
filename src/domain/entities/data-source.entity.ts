import { IApiAuthorizationCredentials, IApiAuthorizationType, IDataSource } from "@interfaces/entities";
import { GenericEntity } from "./generic.entity";
import { Contains, IsDate } from "class-validator";

export class DataSourceEntity extends GenericEntity {

  public appName:string|null=null;
  public apiUrl: string|null=null;
  public apiAuthorizationType: IApiAuthorizationType='noAuth';
  public apiAuthorizationCredentials: IApiAuthorizationCredentials|null=null;

  constructor(dataSource: IDataSource) {
    super(dataSource);
    this.appName=dataSource.appName || null;
    this.apiUrl=dataSource.apiUrl;
    Object.assign(this, dataSource);
  }

  toObject() {
    return super.toObject() as IDataSource;    
  }    

  static override createFromObject(pojoObject: Record<string, any>): [string?, DataSourceEntity?] {
   
    const { id, name, appName, apiUrl, apiAuthorizationType, apiAuthorizationCredentials } = pojoObject;

    if (!name) return ['Name is required'];

    return [undefined, new DataSourceEntity({
      id,
      name,
      appName,
      apiUrl,
      apiAuthorizationType: apiAuthorizationType || 'noAuth',
      apiAuthorizationCredentials
    })];
  }
}