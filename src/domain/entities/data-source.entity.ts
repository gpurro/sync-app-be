import { GenericEntity } from "./generic.entity";
import { type IApiAuthorizationCredentials, type IApiAuthorizationType, type IDataSource } from "@interfaces/entities";

export class DataSourceEntity extends GenericEntity implements IDataSource {

  public appName: string;
  public apiUrl: string;
  public apiAuthorizationType: IApiAuthorizationType='noAuth';
  public apiAuthorizationCredentials: IApiAuthorizationCredentials|null=null;

  constructor(dataSource: IDataSource) {
    super(dataSource);
    this.appName=dataSource.appName;
    this.apiUrl=dataSource.apiUrl;
    this.apiAuthorizationType=dataSource.apiAuthorizationType || 'noAuth';
    this.apiAuthorizationCredentials=dataSource.apiAuthorizationCredentials || null;
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