import { EntityEntity } from "../../../../domain";
import { RecordEntity } from "../../../../domain";
import { EntityService } from "../../../../presentation";
import { ApiBaseService } from "../../../../presentation/api-base/api-base.service";
import { DataSource, Entity } from "../../../../types";
import { createApiConnection } from "../../data-sources/planning-center.api-connection";
import { Axios, AxiosInstance } from 'axios';

export class PcGroupsEntityManager {
  
  constructor(
    public recordService: ApiBaseService
  ){

  }
  public async initializeRecords(entity: Entity) {
    
    const dataSource = entity.dataSource as DataSource;
    
    const apiConnection = createApiConnection(dataSource);
    
    if (apiConnection) {

      const resp = await apiConnection!.get('/' + entity.apiResourceName);

      const groups = resp.data.data;

      groups.forEach((group: any) => { 
        console.log(group.attributes.name);
        const record = new RecordEntity({
          name: group.attributes.name,
          entity: entity._id,
        });
        this.entityService.create(record);
      });

      return resp.data;
    }    

  }

}