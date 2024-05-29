
interface Options {
  name: string
}

export class GenericEntity {

  public name: string;

  constructor(options: Options) {
    this.name = options.name;
  }

  static createFromRequestBody(body: Record<string, any>): [string?, GenericEntity?] {
   
    if (!body.name) return ['name is required'];

    return [undefined, new GenericEntity({
      name: body.name,
    })];
  }
}