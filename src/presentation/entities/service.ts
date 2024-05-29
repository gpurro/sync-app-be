import { EntityModel } from '../../data';
import { EntityEntity } from '../../domain';
import { ApiService } from '../abstract/service';

export class EntityService extends ApiService {

  // DI
  constructor() { 
    super(
      'entity', 
      EntityModel, 
      EntityEntity
    );
  }
}


