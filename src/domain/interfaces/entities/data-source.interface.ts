import { IGeneric } from "./generic.interface";

export type IApiAuthorizationType =  'noAuth' | 'basicAuth' | 'bearerToken' | 'oAuth2' | 'apiKey';

export type IApiAuthorizationCredentials = {
  basicAuth?: IApiAuthorizationCredentialsBasicAuth,
  bearerToken?: IApiAuthorizationCredentialsBearerToken,
  oAuth2?: IApiAuthorizationCredentialsOAuth2,
  apiKey?: IApiAuthorizationCredentialsApiKey
}

export interface IDataSource extends IGeneric {
  appName: string;
  apiUrl: string;
  apiAuthorizationType: IApiAuthorizationType;
  apiAuthorizationCredentials?: IApiAuthorizationCredentials|null;
};

export interface IApiAuthorizationCredentialsBasicAuth {
  username: string;
  password: string;
};

export interface IApiAuthorizationCredentialsBearerToken {
  token: string;
};

export interface IApiAuthorizationCredentialsOAuth2 {
  token: string;
  headerPrefix: string;
};

export interface IApiAuthorizationCredentialsApiKey {
  key: string;
  value: string;
  addToMethod: 'header' | 'queryParams'
};
