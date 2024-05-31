import { EntityEntity } from "../../../domain";
import { EntityService } from "../../../presentation";
import axios from 'axios';
import { DataSource, Entity } from "../../../types";

export class PcGroupsEntityManager {
  
  constructor(
    public entityService: EntityService
  ){

  }
  public connect() {

  }

  public async initializeRecords(entity: Entity) {
    
    const dataSource = entity.dataSource as DataSource;

    const resp = await axios.get(dataSource.apiUrl, { 
      auth: {
        username: dataSource.apiAuthorizationCredentials?.basicAuth?.username!,
        password: dataSource.apiAuthorizationCredentials?.basicAuth?.password!
      } 
    });

    return resp.data;

  }

  public disconnect() {

  }
}