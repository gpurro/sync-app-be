
interface Options {
  name: string
}

export class DataSourceEntity {

  private _name: string;

  constructor(options: Options) {
    this._name = options.name;
  }

  public get name() {
    return this._name;
  }

  public set name(newName: string) {
    this._name = newName
  }

  createFromMongoModel() {

  }
}