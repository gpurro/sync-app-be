import { GenericEntity } from "./generic/generic.entity";

interface Options {
  name: string,
  appName?: string|null,
};

type ApiAuthorizationType = 'noAuth' | 'basicAuth' | 'bearerToken' | 'oAuth2' | 'apiKey';

interface ApiAuthorizationCredentials {
  basicAuth?: {
    username: string,
    password: string
  },
  bearerToken?: {
    token: string
  },
  oAuth2?: {
    token: string,
    headerPrefix: string
  },
  apiKey?: {
    key: string,
    value: string
    addToMethod: 'header' | 'queryParams'
  }
}

export class DataSourceEntity extends GenericEntity {

  public appName:string|null=null;
  public apiUrl:string|null=null;
  public apiAuthorizationType:ApiAuthorizationType='noAuth';
  public apiAuthorizationCredentials:ApiAuthorizationCredentials|null=null;


  constructor(options: Options) {
    super(options);
    this.appName=options.appName || null;
  }

  static override createFromRequestBody(body: Record<string, any>): [string?, DataSourceEntity?] {
   
    const { name, appName } = body;

    if (!name) return ['Name is required'];

    return [undefined, new DataSourceEntity({
      name,
      appName,
    })];
  }
}