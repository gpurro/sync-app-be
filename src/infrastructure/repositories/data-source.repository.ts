import { DataSourceEntity } from "@entities";
import { GenericRepository } from "./generic.repository";
import { IDataSource } from "domain/interfaces/entities/data-source.interface";

export class DataSourceRepository extends GenericRepository<IDataSource, DataSourceEntity> {
  constructor() {
    super('DataSource', DataSourceEntity);
  }
}