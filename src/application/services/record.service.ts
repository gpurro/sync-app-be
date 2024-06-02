import { RecordModel } from '../../infrastructure';
import { GenericService } from './generic.service';

export class RecordService extends GenericService {

  // DI
  constructor() { 
    super(
      'entity', 
      RecordModel
    );
  }

}


