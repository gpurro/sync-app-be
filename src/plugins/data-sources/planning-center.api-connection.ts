import axios from 'axios';
import { DataSource } from '@interfaces/entities';

export const createApiConnection = (dataSource: DataSource) => { 
  
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
