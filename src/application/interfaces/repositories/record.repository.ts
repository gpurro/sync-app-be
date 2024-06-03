import { RecordEntity } from "@entities";
import { type IGenericRepository } from "./generic.repository";
import { type IRecord } from "@interfaces/entities";

export interface IRecordRepository extends IGenericRepository<IRecord, RecordEntity> {
  // custom methods here
}

