import { DataSourceService } from './data-source.service';
import { ApiBaseController } from '../api-base/api-base.controller';

export class DataSourceController extends ApiBaseController {

  // DI
  constructor(
    private readonly dataSourceService: DataSourceService,
  ) { 
    super(
      'data_source',
      dataSourceService
    );
  }

}