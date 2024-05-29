import { EntityService } from './service';
import { ApiController } from '../abstract/controller';

export class EntityController extends ApiController {

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