import { DataSourceEntity } from "@entities";
import { IGenericRepository } from "./generic.repository";
import { IDataSource } from "@interfaces/entities";

export interface IDataSourceRepository extends IGenericRepository<IDataSource, DataSourceEntity> {
  // custom methods here
}

