import { DataSourceModel } from '../../infrastructure';
import { GenericService } from './generic.service';

export class DataSourceService extends GenericService {

  // DI
  constructor() { 
    super(
      'data_source', 
      DataSourceModel
    );
  }
}


