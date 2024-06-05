import { DataSourceEntity } from "@entities";
import axios from "axios";

interface IInitOptions {
  dataSource: DataSourceEntity;
}

export abstract class DataSourceManagerPluginType {
  
  public options: any;
  public pluginManager: any  // the instance of the plugin manager to let the plugin call other plugins
  
  public apiConnection: any;
  public dataSource!: DataSourceEntity;

  init(initOptions: IInitOptions){
    this.dataSource = initOptions.dataSource;
    this.apiConnection = this.createApiConnection(this.dataSource);
  } 
  
  private createApiConnection(dataSource: DataSourceEntity) {
  
    if (dataSource.apiAuthorizationCredentials && dataSource.apiAuthorizationCredentials.basicAuth) {
    
      return axios.create({
        baseURL: dataSource.apiUrl,
        auth: {
          username: dataSource.apiAuthorizationCredentials?.basicAuth?.username!,
          password: dataSource.apiAuthorizationCredentials?.basicAuth?.password!
        }
      }) 
    }

  }  
}