import { EntityModel } from '../../data';
import { EntityEntity } from '../../domain';
import { ApiBaseService } from '../api-base/api-base.service';

export class EntityService extends ApiBaseService {

  // DI
  constructor() { 
    super(
      'entity', 
      EntityModel, 
      EntityEntity
    );
  }

  public initializeRecords() {
    
  }
}


