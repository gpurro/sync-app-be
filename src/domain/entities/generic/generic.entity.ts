import { classToObject } from "../../../config";

interface Options {
  name: string
}

export abstract class GenericEntity {

  public name: string;

  constructor(options: Options) {
    this.name = options.name;
  }

  toObject() {
    return classToObject(this);    
  }


  static createFromObject(pojoObject: Record<string, any>): [string?, GenericEntity?] {
    throw new Error('Method not implemented! Use derived class');
  }
}