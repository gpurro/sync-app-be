import { classToObject } from "./../utils/classToObject";
import { type IGeneric } from "@interfaces/entities";

export abstract class GenericEntity {

  public id: string|null=null;
  public name: string;

  constructor(genericEntity: IGeneric) {
    this.id = genericEntity.id || null;
    this.name = genericEntity.name;
  }

  toObject() {
    return classToObject(this);    
  }

  static createFromObject(pojoObject: Record<string, any>): [string?, GenericEntity?] {
    throw new Error('Method not implemented! Use derived class');
  }
}