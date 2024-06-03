import { EntityEntity } from "@entities";
import { type IGenericRepository } from "./generic.repository";

export interface IEntityRepository extends IGenericRepository<EntityEntity> {
  // custom methods here
}

