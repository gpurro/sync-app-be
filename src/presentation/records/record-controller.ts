import { RecordService } from './record-service';
import { ApiBaseController } from '../api-base/api-base.controller';
import { RecordEntity } from '../../domain';

export class RecordController extends ApiBaseController {

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