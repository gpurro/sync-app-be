import { RecordEntity } from "@entities";
import { type IGenericRepository } from "./generic.repository";

export interface IRecordRepository extends IGenericRepository<RecordEntity> {
  // custom methods here
}

