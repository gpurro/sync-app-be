import { DataSourceEntity } from "@entities";
import { type IGenericRepository } from "./generic.repository";

export interface IDataSourceRepository extends IGenericRepository<DataSourceEntity> {
  // custom methods here
}

