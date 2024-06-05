import { DataSourceEntity, EntityEntity, RecordEntity } from "@entities";
import { RecordService } from "@services";
import { RecordRepository } from "@repositories";
import { IDataSource } from "@interfaces/entities";
import { DataSourceManagerPluginType } from "@plugin-types";

interface IInitOptions {
  dataSourceManagerPluginName: string;
  entity: EntityEntity;
}
export abstract class EntityManagerPluginType {

  public options: any;
  public pluginManager: any  // the instance of the plugin manager to let the plugin call other plugins
  
  public dataSourceManagerPluginName: string='';
  public entity!: EntityEntity;

  init(initOptions: IInitOptions){
    this.dataSourceManagerPluginName = initOptions.dataSourceManagerPluginName;
    this.entity = initOptions.entity;
  }

  public async initializeRecords() {
    
    // load plugin
    const dataSourceManager = this.pluginManager.loadPlugin(this.dataSourceManagerPluginName) as DataSourceManagerPluginType;

    // init plugin
    const dataSource = this.entity.dataSource as DataSourceEntity;
    dataSourceManager.init({dataSource});

    const apiConnection = dataSourceManager.apiConnection;
    
    if (apiConnection) {

      const resp = await apiConnection!.get('/' + this.entity.apiResourceName);

      const groups = resp.data.data;
      
      const repository = new RecordRepository();
      const recordService = new RecordService(repository);
      
      groups.forEach((group: any) => { 
        console.log(group.attributes.name);
        
        const record = new RecordEntity({
          name: group.attributes.name,
          entity: this.entity.id,
        } as RecordEntity);
        
        recordService.create(record);
      });
    return resp.data;
    }    
  }
}