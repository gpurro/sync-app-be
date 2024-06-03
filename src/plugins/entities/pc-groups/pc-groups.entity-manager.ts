import { GenericService } from "@services";
import { type IDataSource, type IEntity } from "@interfaces/entities";
import { createApiConnection } from "../../data-sources/planning-center.api-connection";

export class PcGroupsEntityManager {
  
  constructor(
    public recordService: GenericService
  ){

  }
  public async initializeRecords(entity: IEntity) {
    
    const dataSource = entity.dataSource as IDataSource;
    
    const apiConnection = createApiConnection(dataSource);
    
    if (apiConnection) {

      const resp = await apiConnection!.get('/' + entity.apiResourceName);

      const groups = resp.data.data;

      groups.forEach((group: any) => { 
        console.log(group.attributes.name);
        /*
        const record = new RecordEntity({
          name: group.attributes.name,
          entity: entity._id,
        });
        */
        // this.entityService.create(record);
      });

      return resp.data;
    }    

  }

}