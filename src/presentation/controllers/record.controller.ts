import { RecordService } from '@services';
import { RecordEntity } from '@entities';
import { GenericController } from './generic.controller';
import { type IRecord } from '@interfaces/entities';

export class RecordController extends GenericController<RecordEntity> {

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