import { EntityService } from './entity-service';
import { ApiBaseController } from '../api-base/api-base.controller';

export class EntityController extends ApiBaseController {

  // DI
  constructor(
    private readonly entityService: EntityService,
  ) { 
    super(
      'entity',
      entityService
    );
  }

}