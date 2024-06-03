import { RecordEntity } from "@entities";
import { GenericRepository } from "./generic.repository";
import { type IRecord } from "@interfaces/entities";

export class RecordRepository extends GenericRepository<IRecord, RecordEntity> {
  constructor() {
    super('Record', RecordEntity);
  }
}