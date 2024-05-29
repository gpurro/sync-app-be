import { Validators } from "../../config";
import { GenericEntity } from "./generic/generic.entity";

interface Options {
  name: string,
  dataSource: string,
  apiResourceName: string
};

export class EntityEntity extends GenericEntity {

  public dataSource:string;
  public apiResourceName:string;

  constructor(options: Options) {
    super(options);
    this.dataSource=options.dataSource;
    this.apiResourceName=options.apiResourceName;
  }

  static override createFromRequestBody(body: Record<string, any>): [string?, EntityEntity?] {
   
    const { name, dataSource, apiResourceName } = body;

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