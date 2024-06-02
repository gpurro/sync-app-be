import { RecordService } from '@services';
import { GenericController } from './generic.controller';
import { RecordEntity } from '@entities';

export class RecordController extends GenericController {

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