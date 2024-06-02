import { EntityService } from '@services';
import { GenericController } from './generic.controller';
import { Validators } from '@config';
import { Response, Request } from 'express';
import { EntityEntity } from '@entities';

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