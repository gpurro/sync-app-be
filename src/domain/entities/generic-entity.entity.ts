import { classToObject } from "@config";
import { type GenericEntity } from "@interfaces/entities";

export abstract class GenericEntityEntity {

  public name: string;

  constructor(genericEntity: GenericEntity) {
    this.name = genericEntity.name;
  }

  toObject() {
    return classToObject(this);    
  }


  static createFromObject(pojoObject: Record<string, any>): [string?, GenericEntityEntity?] {
    throw new Error('Method not implemented! Use derived class');
  }
}