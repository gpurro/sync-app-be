import { GenericEntity } from "./generic-entity.interface";

export type ApiAuthorizationType =  'noAuth' | 'basicAuth' | 'bearerToken' | 'oAuth2' | 'apiKey';

export type ApiAuthorizationCredentials = {
  basicAuth?: ApiAuthorizationCredentialsBasicAuth,
  bearerToken?: ApiAuthorizationCredentialsBearerToken,
  oAuth2?: ApiAuthorizationCredentialsOAuth2,
  apiKey?: ApiAuthorizationCredentialsApiKey
}

export interface DataSource extends GenericEntity {
  appName?: string;
  apiUrl: string;
  apiAuthorizationType: ApiAuthorizationType;
  apiAuthorizationCredentials?: ApiAuthorizationCredentials;
};

export interface ApiAuthorizationCredentialsBasicAuth {
  username: string;
  password: string;
};

export interface ApiAuthorizationCredentialsBearerToken {
  token: string;
};

export interface ApiAuthorizationCredentialsOAuth2 {
  token: string;
  headerPrefix: string;
};

export interface ApiAuthorizationCredentialsApiKey {
  key: string;
  value: string;
  addToMethod: 'header' | 'queryParams'
};
