import { EntityService } from '../../application/services/entity.service';
import { GenericController } from './generic.controller';
import { PcGroupsEntityManager } from '../../plugins/entities/pc-groups';
import { Validators } from '../../config';
import { Response, Request } from 'express';
import { EntityEntity } from '../../domain';

export class EntityController extends GenericController {

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