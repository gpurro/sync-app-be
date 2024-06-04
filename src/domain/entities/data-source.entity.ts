import { GenericEntity } from "./generic.entity";
import { type IApiAuthorizationCredentials, type IApiAuthorizationType, type IDataSource } from "@interfaces/entities";

export class DataSourceEntity extends GenericEntity implements IDataSource {

  public appName: string;
  public apiUrl: string;
  public pluginName: string;
  public apiAuthorizationType: IApiAuthorizationType='noAuth';
  public apiAuthorizationCredentials: IApiAuthorizationCredentials|null=null;

  constructor(dataSource: DataSourceEntity) {
    super(dataSource);
    this.appName=dataSource.appName;
    this.apiUrl=dataSource.apiUrl;
    this.pluginName=dataSource.pluginName;
    this.apiAuthorizationType=dataSource.apiAuthorizationType || 'noAuth';
    this.apiAuthorizationCredentials=dataSource.apiAuthorizationCredentials || null;
  }

  toObject() {
    return super.toObject() as IDataSource;    
  }    

}