import { DataSourceService } from './data-source.service';
import { ApiBaseController } from '../api-base/api-base.controller';
import { DataSourceEntity } from '../../domain';

export class DataSourceController extends ApiBaseController {

  // DI
  constructor(
    private readonly dataSourceService: DataSourceService,
  ) { 
    super(
      'data_source',
      new DataSourceService(),
      DataSourceEntity.createFromObject
    );
  }

}