import { GenericEntity } from "./abstract/generic.entity";

interface Options {
  name: string,
  appName?: string|null,
};

export class DataSourceEntity extends GenericEntity {

  public appName:string|null=null;

  constructor(options: Options) {
    super(options);
    this.appName=options.appName || null;
  }

  static override createFromRequestBody(body: Record<string, any>): [string?, DataSourceEntity?] {
   
    if (!body.name) return ['name is required'];

    return [undefined, new DataSourceEntity({
      name: body.name,
      appName: body.appName,
    })];
  }
}