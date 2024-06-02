import { DataSourceService } from '@services';
import { GenericController } from './generic.controller';
import { DataSourceEntity } from '@entities';

export class DataSourceController extends GenericController {

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