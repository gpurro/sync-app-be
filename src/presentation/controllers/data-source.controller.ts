import { DataSourceService } from '../../application/services/data-source.service';
import { GenericController } from './generic.controller';
import { DataSourceEntity } from '../../domain';

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