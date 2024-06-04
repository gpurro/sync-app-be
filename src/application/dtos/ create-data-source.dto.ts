import { IApiAuthorizationCredentials, IApiAuthorizationType, IDataSource } from "@interfaces/entities";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateDataSourceDto implements Partial<IDataSource> {

  @IsNotEmpty()
  @IsString()
  public name!: string;
  
  @IsNotEmpty()
  @IsString()
  public appName!: string;
  
  @IsNotEmpty()
  @IsString()
  public apiUrl!: string;
  
  @IsIn(['noAuth', 'basicAuth', 'bearerAuth', 'apiKey', 'oAuth2'])
  public apiAuthorizationType: IApiAuthorizationType='noAuth';
  
  public apiAuthorizationCredentials: IApiAuthorizationCredentials|null=null;

  constructor(props: Record<string, unknown>) {
    Object.assign(this, props);
  }
}