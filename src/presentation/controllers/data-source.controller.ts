import { DataSourceService } from '@services';
import { DataSourceEntity } from '@entities';
import { GenericController } from './generic.controller';
import { CreateDataSourceDto } from '@dtos';
import { validate } from 'class-validator';
import { CustomError } from 'domain/errors/custom.error';

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

    this.validateCreateOperation = async (data: Record<string, unknown>) => { 

      const entity = new CreateDataSourceDto(data);
      const errors = await validate(entity, { validationError: { target: false } });

      if (errors.length > 0) {
        console.log(errors);
        const errorMessages = errors.map(error => Object.values(error.constraints!));
        throw CustomError.badRequest(JSON.stringify(errorMessages));  
      }
    }
  }

}