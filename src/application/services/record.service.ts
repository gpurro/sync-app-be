import { GenericService } from './generic.service';
import { RecordEntity } from '@entities';
 
import { type IRecordRepository } from '@interfaces/repositories';

export class RecordService extends GenericService<RecordEntity>{

  // DI
  constructor(
    protected readonly repository: IRecordRepository
  ) { 
    super(
      'record',
      repository
    );
  }
}


