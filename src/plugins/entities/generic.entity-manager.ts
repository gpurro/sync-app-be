import { RecordService } from "@services";
import { GenericDataSourceManager } from "plugins/data-sources/generic.data-source-manager";
import { EntityEntity, RecordEntity } from "@entities";
import { EntityManagerPluginType } from "@plugin-types";

export abstract class GenericEntityManager extends EntityManagerPluginType {
  
    constructor(
      public dataSourceManagerPluginName: string,
      public recordService: RecordService,
      public entity: EntityEntity,
  ){
    super();
  }

  public async initializeRecords() {
    
    const dataSourceManager = this.pluginManager.getPlugin(this.dataSourceManagerPluginName) as GenericDataSourceManager;

    const apiConnection = dataSourceManager.apiConnection;
    
    if (apiConnection) {

      const resp = await apiConnection!.get('/' + this.entity.apiResourceName);

      const groups = resp.data.data;

      groups.forEach((group: any) => { 
        console.log(group.attributes.name);
        
        const record = new RecordEntity({
          name: group.attributes.name,
          entity: this.entity.id,
        } as RecordEntity);
        
        this.recordService.create(record);
      });
    return resp.data;
    }    
  }
}
