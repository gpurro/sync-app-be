import { IDataSource } from '@interfaces/entities';
import { GenService } from './gen.service';
import { DataSourceEntity } from '@entities';
import { IDataSourceRepository } from '@interfaces/repositories';

export class DataSourceService extends GenService<IDataSource, DataSourceEntity>{

  // DI
  constructor(
    protected readonly repository: IDataSourceRepository
  ) { 
    super(
      'data_source',
      repository
    );
  }
}


