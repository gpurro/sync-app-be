import { RecordModel } from '../../data';
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


