import { ApiAuthorizationCredentials, ApiAuthorizationType, DataSource } from "../../types";
import { GenericEntity } from "./generic/generic.entity";

export class DataSourceEntity extends GenericEntity {

  public appName:string|null=null;
  public apiUrl:string|null=null;
  public apiAuthorizationType:ApiAuthorizationType='noAuth';
  public apiAuthorizationCredentials:ApiAuthorizationCredentials|null=null;

  constructor(dataSource: DataSource) {
    super(dataSource);
    this.appName=dataSource.appName || null;
    this.apiUrl=dataSource.apiUrl;
  }

  toObject() {
    return super.toObject() as DataSource;    
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