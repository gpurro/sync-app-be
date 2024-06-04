import { classToObject } from "./../utils/classToObject";
import { type IGeneric } from "@interfaces/entities";

export abstract class GenericEntity implements IGeneric {

  public id?: string|null=null;
  public name: string;

  constructor(genericEntity: GenericEntity) {
    this.id = genericEntity.id || null;
    this.name = genericEntity.name;
  }

  toObject() {
    return classToObject(this);    
  }

}