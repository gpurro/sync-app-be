import { RecordModel } from '../../data';
import { ApiBaseService } from '../api-base/api-base.service';

export class RecordService extends ApiBaseService {

  // DI
  constructor() { 
    super(
      'entity', 
      RecordModel
    );
  }

}


