import { RecordService } from './record-service';
import { ApiBaseController } from '../api-base/api-base.controller';

export class RecordController extends ApiBaseController {

  // DI
  constructor(
    private readonly recordService: RecordService,
  ) { 
    super(
      'record',
      recordService
    );
  }

}