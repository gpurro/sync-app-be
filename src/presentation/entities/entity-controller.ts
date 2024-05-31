import { EntityService } from './entity-service';
import { ApiBaseController } from '../api-base/api-base.controller';
import { PcGroupsEntityManager } from '../../infrastructure/plugins';
import { Validators } from '../../config';
import { Response, Request } from 'express';
import { EntityEntity } from '../../domain';

export class EntityController extends ApiBaseController {

  // DI
  constructor(
    private readonly entityService: EntityService,
  ) { 
    super(
      'entity',
      entityService,
      EntityEntity.createFromObject
    );
  }

  initializeRecords = async (req: Request, res: Response) => {

    const id = req.params.id;
    if (!Validators.isMongoID(id)) return res.status(400).json({ error: 'Received Id is not an ObjectID' });
    
    this.entityService.initializeRecords(id)
      .then( document => res.json(document))
      .catch(error => this.handleError(error, res));
  };

}