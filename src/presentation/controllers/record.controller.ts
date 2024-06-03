import { RecordService } from '@services';
import { RecordEntity } from '@entities';
import { GenController } from './gen.controller';
import { type IRecord } from '@interfaces/entities';

export class RecordController extends GenController<IRecord, RecordEntity> {

  // DI
  constructor(
    private readonly recordService: RecordService,
  ) { 
    super(
      'record',
      recordService,
      RecordEntity.createFromObject
    );
  }

}