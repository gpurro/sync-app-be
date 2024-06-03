import { DataSourceEntity } from "@entities";
import { type IGenericRepository } from "./generic.repository";
import { type IDataSource } from "@interfaces/entities";

export interface IDataSourceRepository extends IGenericRepository<IDataSource, DataSourceEntity> {
  // custom methods here
}

