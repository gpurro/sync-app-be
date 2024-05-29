
interface Options {
  name: string
}

export class GenericEntity {

  public name: string;

  constructor(options: Options) {
    this.name = options.name;
  }

  static createFromRequestBody(body: Record<string, any>): [string?, GenericEntity?] {
   
    const { name } = body;
    if (!name) return ['Name is required'];

    return [undefined, new GenericEntity({
      name,
    })];
  }
}