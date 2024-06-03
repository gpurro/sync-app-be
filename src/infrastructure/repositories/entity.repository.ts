import { EntityEntity } from "@entities";
import { GenericRepository } from "./generic.repository";
import { type IEntity } from "@interfaces/entities";

export class EntityRepository extends GenericRepository<IEntity, EntityEntity> {
  constructor() {
    super('Entity', EntityEntity);
  }
}