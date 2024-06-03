import { IApiAuthorizationCredentials, IApiAuthorizationType, IDataSource } from "@interfaces/entities";
import { GenericEntity } from "./generic.entity";

export class DataSourceEntity extends GenericEntity {

  public appName:string|null=null;
  public apiUrl:string|null=null;
  public apiAuthorizationType:IApiAuthorizationType='noAuth';
  public apiAuthorizationCredentials:IApiAuthorizationCredentials|null=null;

  constructor(dataSource: IDataSource) {
    super(dataSource);
    this.appName=dataSource.appName || null;
    this.apiUrl=dataSource.apiUrl;
  }

  toObject() {
    return super.toObject() as IDataSource;    
  }    

  static override createFromObject(pojoObject: Record<string, any>): [string?, DataSourceEntity?] {
   
    const { name, appName, apiUrl, apiAuthorizationType, apiAuthorizationCredentials } = pojoObject;

    if (!name) return ['Name is required'];

    return [undefined, new DataSourceEntity({
      name,
      appName,
      apiUrl,
      apiAuthorizationType: apiAuthorizationType || 'noAuth',
      apiAuthorizationCredentials
    })];
  }
}