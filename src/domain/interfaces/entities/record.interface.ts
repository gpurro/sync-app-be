import { type IEntity } from "./entity.interface";
import { type IGeneric } from "./generic.interface";

export interface IRecord extends IGeneric {
  entity: string | Record<string,any> | IEntity;
};