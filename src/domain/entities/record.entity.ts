import { Validators } from "../../config";
import { GenericEntity } from "./generic/generic.entity";

interface Options {
  name: string,
  entity: string,
};

export class RecordEntity extends GenericEntity {

  public entity:string;

  constructor(options: Options) {
    super(options);
    this.entity=options.entity;
  }

  static override createFromRequestBody(body: Record<string, any>): [string?, RecordEntity?] {
   
    const { name, entity } = body;

    if (!name) return ['Name is required'];

    if (!entity) return ['Entity is required'];
    if (!Validators.isMongoID(entity)) return ['Invalid Entity ID'];

    return [undefined, new RecordEntity({
      name,
      entity,
    })];
  }
}