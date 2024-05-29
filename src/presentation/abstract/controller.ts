
import { Response, Request } from 'express';
import { CustomError, GenericEntity, PaginationEntity } from '../../domain';
import { ApiService } from './service';

export abstract class ApiController {

  constructor(
    public resourceName: string,
    public apiService: ApiService,
  ) {}

  protected handleError = ( error: unknown, res: Response ) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${ error }`);
    return res.status(500).json({ error: `Internal server error in ${ this.resourceName }` });
  };

  create = async ( req: Request, res: Response ) => {

    const [error, genericEntity] = GenericEntity.createFromRequestBody(req.body);
    if (error) return res.status(400).json({ error });

    this.apiService.create(genericEntity!)
      .then( documents => res.status(201).json(documents) )
      .catch( error => this.handleError(error, res) );
  };

  getAll = async (req: Request, res: Response) => {

    const { page = 1, limit = 10 } = req.query;
    const [error, paginationEntity] = PaginationEntity.create( +page, +limit );
    if (error) return res.status(400).json({ error });
    
    this.apiService.getAll(paginationEntity!)
      .then( documents => res.json(documents))
      .catch(error => this.handleError(error, res));
  };
}