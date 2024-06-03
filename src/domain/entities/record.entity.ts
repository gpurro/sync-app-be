import { Validators } from "../../config";
import { GenericEntity } from "./generic.entity";
import { type IEntity, type IRecord } from "@interfaces/entities";

export class RecordEntity extends GenericEntity implements IRecord {

  public entity: string | Record<string,any> | IEntity;

  constructor(record: IRecord) {
    super(record);
    this.entity=record.entity;
  }

  toObject() {
    return super.toObject() as IRecord;    
  }  

  static override createFromObject(pojoObject: Record<string, any>): [string?, RecordEntity?] {
   
    const { name, entity } = pojoObject;

    if (!name) return ['Name is required'];

    if (!entity) return ['Entity is required'];
    if (!Validators.isMongoID(entity)) return ['Invalid Entity ID'];

    return [undefined, new RecordEntity({
      name,
      entity,
    })];
  }
}