import { RecordService } from '../../application/services/record.service';
import { GenericController } from './generic.controller';
import { RecordEntity } from '../../domain';

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