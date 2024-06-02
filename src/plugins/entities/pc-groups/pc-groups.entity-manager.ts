import { EntityEntity } from "../../../domain";
import { RecordEntity } from "../../../domain";
import { EntityService } from "../../../application/services/entity.service";
import { GenericService } from "../../../application/services/generic.service";
import { DataSource, Entity } from "../../../domain/interfaces";
import { createApiConnection } from "../../data-sources/planning-center.api-connection";
import { Axios, AxiosInstance } from 'axios';

export class PcGroupsEntityManager {
  
  constructor(
    public recordService: GenericService
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