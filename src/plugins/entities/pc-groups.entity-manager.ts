import { RecordService } from "@services";
import { type IDataSource } from "@interfaces/entities";
import { EntityEntity } from "@entities";
import { GenericEntityManager } from "./generic.entity-manager";

export class PcGroupsEntityManager extends GenericEntityManager {
  
  constructor(
    public recordService: RecordService,
    public entity: EntityEntity,
  ){
    super('PlanningCenter.DataSourceManager', recordService, entity);
  }
}

export default PcGroupsEntityManager;