import { Validators } from "../../config";
import { GenericEntity } from "./generic.entity";
import { type IEntity, type IRecord } from "@interfaces/entities";

export class RecordEntity extends GenericEntity implements IRecord {

  public entity: string | Record<string,any> | IEntity;

  constructor(record: RecordEntity) {
    super(record);
    this.entity=record.entity;
  }

  toObject() {
    return super.toObject() as IRecord;    
  }  

}