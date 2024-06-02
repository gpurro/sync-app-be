import { Entity } from "./entity.interface";
import { GenericEntity } from "./generic-entity.interface";

export interface IRecord extends GenericEntity {
  entity: string | Record<string,any> | Entity;
};