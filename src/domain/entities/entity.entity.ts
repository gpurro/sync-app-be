import { Validators } from "../../config";
import { GenericEntity } from "./abstract/generic.entity";

interface Options {
  name: string,
  dataSource?: string|null,
};

export class EntityEntity extends GenericEntity {

  public dataSource:string|null=null;

  constructor(options: Options) {
    super(options);
    this.dataSource=options.dataSource || null;
  }

  static override createFromRequestBody(body: Record<string, any>): [string?, EntityEntity?] {
   
    const { name, dataSource } = body;

    if (!name) return ['Name is required'];

    if (!dataSource) return ['DataSource is required'];
    if (!Validators.isMongoID(dataSource)) return ['Invalid DataSource ID'];

    return [undefined, new EntityEntity({
      name,
      dataSource,
    })];
  }
}