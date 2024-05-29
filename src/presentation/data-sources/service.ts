import { DataSourceModel } from '../../data';
import { DataSourceEntity } from '../../domain';
import { ApiService } from '../abstract/service';

export class DataSourceService extends ApiService {

  // DI
  constructor() { 
    super(
      'data_source', 
      DataSourceModel, 
      DataSourceEntity
    );
  }
}


