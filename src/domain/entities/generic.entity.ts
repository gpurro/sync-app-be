import { classToObject } from "@config";
import { type IGeneric } from "@interfaces/entities";

export abstract class GenericEntity {

  public name: string;

  constructor(genericEntity: IGeneric) {
    this.name = genericEntity.name;
  }

  toObject() {
    return classToObject(this);    
  }


  static createFromObject(pojoObject: Record<string, any>): [string?, GenericEntity?] {
    throw new Error('Method not implemented! Use derived class');
  }
}