import { GenericService } from './generic.service';
import { DataSourceEntity } from '@entities';

import { type IDataSourceRepository } from '@interfaces/repositories';

export class DataSourceService extends GenericService<DataSourceEntity>{

  // DI
  constructor(
    protected readonly repository: IDataSourceRepository
  ) { 
    super(
      repository,
      'data_source',
    );
  }
}


