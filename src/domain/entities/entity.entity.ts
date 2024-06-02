import { Document, StringSchemaDefinition } from "mongoose";
import { Validators } from "../../config";
import { GenericEntityEntity } from "./generic-entity.entity";
import { Entity } from "@interfaces/entities";

export class EntityEntity extends GenericEntityEntity {

  public dataSource:string;
  public apiResourceName:string;

  constructor(entity: Entity) {
    super(entity);
    this.dataSource=entity.dataSource as string;
    this.apiResourceName=entity.apiResourceName;
  }

  toObject() {
    return super.toObject() as Entity;    
  }  

  static override createFromObject(pojoObject: Record<string, any>): [string?, EntityEntity?] {
   
    const { name, dataSource, apiResourceName } = pojoObject;

    if (!name) return ['Name is required'];

    if (!dataSource) return ['DataSource is required'];
    if (!Validators.isMongoID(dataSource)) return ['Invalid DataSource ID'];

    if (!apiResourceName) return ['ApiResourceName is required'];

    return [undefined, new EntityEntity({
      name,
      dataSource,
      apiResourceName,
    })];
  }

}