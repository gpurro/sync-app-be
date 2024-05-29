import { RecordModel } from '../../data';
import { RecordEntity } from '../../domain';
import { ApiBaseService } from '../api-base/api-base.service';

export class RecordService extends ApiBaseService {

  // DI
  constructor() { 
    super(
      'entity', 
      RecordModel, 
      RecordEntity
    );
  }

  public initializeRecords() {
    
  }
}


