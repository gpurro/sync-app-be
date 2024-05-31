import { Validators } from "../../config";
import { GenericEntity } from "./generic/generic.entity";
import { IRecord } from "../../types";

export class RecordEntity extends GenericEntity {

  public entity:string;

  constructor(record: IRecord) {
    super(record);
    this.entity=record.entity as string;
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