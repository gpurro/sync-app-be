import { Validators } from "../../config";
import { GenericEntity } from "./generic.entity";
import { type IDataSource, type IEntity } from "@interfaces/entities";

export class EntityEntity extends GenericEntity implements IEntity {

  public dataSource: string | Record<string, unknown> | IDataSource;
  public apiResourceName:string;
  public pluginName: string;

  constructor(entity: EntityEntity) {
    super(entity);
    this.dataSource=entity.dataSource;
    this.apiResourceName=entity.apiResourceName;
    this.pluginName=entity.pluginName;
  }

  toObject() {
    return super.toObject() as IEntity;    
  }  

}