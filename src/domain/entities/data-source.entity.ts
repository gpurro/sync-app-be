
interface Options {
  name: string
}

export class DataSourceEntity {

  public name: string;

  constructor(options: Options) {
    this.name = options.name;
  }

  static createFromRequestBody(body: Record<string, any>): [string?, DataSourceEntity?] {
   
    if (!body.name) return ['name is required'];

    return [undefined, new DataSourceEntity({
      name: body.name
    })];
  }
}