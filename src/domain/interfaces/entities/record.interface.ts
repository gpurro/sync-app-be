import { IEntity } from "./entity.interface";
import { IGeneric } from "./generic.interface";

export interface IRecord extends IGeneric {
  entity: string | Record<string,any> | IEntity;
};