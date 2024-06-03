import { DataSourceService } from '@services';
import { DataSourceEntity } from '@entities';
import { GenController } from './gen.controller';
import { type IDataSource } from '@interfaces/entities';

export class DataSourceController extends GenController<IDataSource, DataSourceEntity> {

  // DI
  constructor(
    private readonly dataSourceService: DataSourceService,
  ) { 
    super(
      'data_source',
      dataSourceService,
      DataSourceEntity.createFromObject
    );
  }

}