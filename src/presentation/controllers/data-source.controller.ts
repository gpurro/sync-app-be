import { DataSourceService } from '@services';
import { DataSourceEntity } from '@entities';
import { GenericController } from './generic.controller';
import { type IDataSource } from '@interfaces/entities';

export class DataSourceController extends GenericController<IDataSource, DataSourceEntity> {

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