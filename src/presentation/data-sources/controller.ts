import { Response, Request } from 'express';
import { CustomError, DataSourceEntity, PaginationEntity  } from '../../domain';
import { DataSourceService } from './service';
import { ApiController } from '../abstract/controller';

export class DataSourceController extends ApiController {

  // DI
  constructor(
    private readonly dataSourceService: DataSourceService,
  ) { 
    super(
      'data_source',
      dataSourceService
    );
  }

}