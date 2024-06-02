import { DataSource } from "./data-source.interface";
import { GenericEntity } from "./generic-entity.interface";

export interface Entity extends GenericEntity {
  dataSource: string | Record<string, unknown> | DataSource;
  apiResourceName: string;
};