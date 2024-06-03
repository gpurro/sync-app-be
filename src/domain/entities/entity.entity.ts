import { Validators } from "../../config";
import { GenericEntity } from "./generic.entity";
import { type IDataSource, type IEntity } from "@interfaces/entities";

export class EntityEntity extends GenericEntity implements IEntity {

  public dataSource: string | Record<string, unknown> | IDataSource;
  public apiResourceName:string;

  constructor(entity: IEntity) {
    super(entity);
    this.dataSource=entity.dataSource;
    this.apiResourceName=entity.apiResourceName;
  }

  toObject() {
    return super.toObject() as IEntity;    
  }  

  static override createFromObject(pojoObject: Record<string, any>): [string?, EntityEntity?] {
   
    const { id, name, dataSource, apiResourceName } = pojoObject;

    if (!name) return ['Name is required'];

    if (!dataSource) return ['DataSource is required'];
    if (!Validators.isMongoID(dataSource)) return ['Invalid DataSource ID'];

    if (!apiResourceName) return ['ApiResourceName is required'];

    return [undefined, new EntityEntity({
      id, 
      name,
      dataSource,
      apiResourceName,
    })];
  }

}