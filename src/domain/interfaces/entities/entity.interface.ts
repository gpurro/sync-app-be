import { IDataSource } from "./data-source.interface";
import { IGeneric } from "./generic.interface";

export interface IEntity extends IGeneric {
  dataSource: string | Record<string, unknown> | IDataSource;
  apiResourceName: string;
  pluginName: string;
};