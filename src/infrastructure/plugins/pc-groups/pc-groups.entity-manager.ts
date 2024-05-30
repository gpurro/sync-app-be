import { EntityEntity } from "../../../domain";
import { EntityService } from "../../../presentation";
import axios from 'axios';

export class PcGroupsEntityManager {
  
  constructor(
    public entityService: EntityService
  ){

  }
  public connect() {

  }

  public initializeRecords(entity: EntityEntity) {

    axios.get('https://example.com/api', { 
      auth: {
        username: 'user',
        password: 'pass'
      } 
    })
    .then(response => {
      // Handle success
    })
    .catch(error => {
      // Handle error
    });
  }

  public disconnect() {

  }
}