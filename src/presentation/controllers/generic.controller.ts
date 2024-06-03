
import { Response, Request } from 'express';
import { GenericEntity, PaginationEntity } from '@entities';
import { GenericService } from '@services';
import { Validators } from '@config';
import { CustomError } from 'domain/errors/custom.error';
import { IGeneric } from '@interfaces/entities';

export abstract class GenericController <T extends IGeneric, E extends GenericEntity> {

  constructor(
    public readonly  resourceName: string,
    public readonly service: GenericService<T , E>,
    public readonly createFromObject: (pojoObject: Record<string, any>) => [string?, E?],
  ) {}

  protected handleError = ( error: unknown, res: Response ) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${ error }`);
    return res.status(500).json({ error: `Internal server error in ${ this.resourceName }` });
  };

  create = async ( req: Request, res: Response ) => {

    const [error, entityEntity] = this.createFromObject(req.body);
    if (error) return res.status(400).json({ error });

    this.service.create(entityEntity!)
      .then( entity => res.status(201).json(entity) )
      .catch( error => this.handleError(error, res) );
  };

  getAll = async (req: Request, res: Response) => {

    const { page = 1, limit = 10 } = req.query;
    const [error, paginationEntity] = PaginationEntity.create(+page, +limit);
    if (error) return res.status(400).json({ error });
    
    this.service.getAll(paginationEntity!)
      .then( entities => res.json(entities))
      .catch(error => this.handleError(error, res));
  };

  getOne = async (req: Request, res: Response) => {

    const id = req.params.id;
    if (!Validators.isMongoID(id)) return res.status(400).json({ error: 'Received Id is not an ObjectID' });
    
    this.service.getOne(id)
      .then( enitity => res.json(enitity))
      .catch(error => this.handleError(error, res));
  };
}