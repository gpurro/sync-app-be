import { Response, Request } from 'express';
import { EntityService } from '@services';
import { EntityEntity } from '@entities';
import { GenericController } from './generic.controller';
import { type IEntity } from '@interfaces/entities';
import { Validators } from '@config';

export class EntityController extends GenericController<EntityEntity> {

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
      .then( entity => res.json(entity))
      .catch(error => this.handleError(error, res));
  };
}
