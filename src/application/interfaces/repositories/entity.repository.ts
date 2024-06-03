import { EntityEntity } from "@entities";
import { type IGenericRepository } from "./generic.repository";
import { type IEntity } from "@interfaces/entities";

export interface IEntityRepository extends IGenericRepository<IEntity, EntityEntity> {
  // custom methods here
}

