import { DataSourceService } from '@services';
import { DataSourceEntity } from '@entities';
import { GenericController } from './generic.controller';

export class DataSourceController extends GenericController<DataSourceEntity> {

  // DI
  constructor(
    private readonly dataSourceService: DataSourceService,
  ) { 
    super(
      'data_source',
      dataSourceService,
      DataSourceEntity
    );
  }

}