import axios from 'axios';
import { IDataSource } from '@interfaces/entities';
import { DataSourceManagerPluginType } from '@plugin-types';

export abstract class GenericDataSourceManager extends DataSourceManagerPluginType {
  
  constructor(dataSource: IDataSource) {
    super();
    this.apiConnection = this.createApiConnection(dataSource);
  }
  
  private createApiConnection(dataSource: IDataSource) {
  
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

