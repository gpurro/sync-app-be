import { Entity } from "./entity.interface";

export interface IRecord {
  name: string;
  entity: string | Record<string,any> | Entity;
};