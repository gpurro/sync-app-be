import { DataSourceModel } from '../../data';
import { DataSourceEntity } from '../../domain';
import { ApiBaseService } from '../api-base/api-base.service';

export class DataSourceService extends ApiBaseService {

  // DI
  constructor() { 
    super(
      'data_source', 
      DataSourceModel, 
      DataSourceEntity
    );
  }
}


