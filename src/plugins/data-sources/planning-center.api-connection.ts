import axios from 'axios';
import { IDataSource } from '@interfaces/entities';

export const createApiConnection = (dataSource: IDataSource) => { 
  
  if (dataSource.apiAuthorizationCredentials && dataSource.apiAuthorizationCredentials.basicAuth) {

    return axios.create({
      baseURL: dataSource.apiUrl,
      auth: {
        username: dataSource.apiAuthorizationCredentials?.basicAuth?.username!,
        password: dataSource.apiAuthorizationCredentials?.basicAuth?.password!
      }
    }) 
  }
};
