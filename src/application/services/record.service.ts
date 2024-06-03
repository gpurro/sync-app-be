import { GenService } from './gen.service';
import { RecordEntity } from '@entities';
 
import { type IRecord } from '@interfaces/entities';
import { type IRecordRepository } from '@interfaces/repositories';

export class RecordService extends GenService<IRecord, RecordEntity>{

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


