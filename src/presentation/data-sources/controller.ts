import { Response, Request } from 'express';
import { CustomError, DataSourceEntity, PaginationEntity  } from '../../domain';
import { DataSourceService } from './service';

export class DataSourceController {

  // DI
  constructor(
    private readonly dataSourceService: DataSourceService,
  ) { }

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json({ error: error.message });
    }
    console.log( `${ error }` );
    return res.status(500).json( { error: 'Internal server error' } );
  };

  create = async ( req: Request, res: Response ) => {

    const [error, dataSourceEntity] = DataSourceEntity.createFromRequestBody(req.body);
    if (error) return res.status(400).json({ error });

    this.dataSourceService.create(dataSourceEntity!)
      .then( dataSource => res.status(201).json(dataSource) )
      .catch( error => this.handleError(error, res) );
  };

  getAll = async (req: Request, res: Response) => {

    const { page = 1, limit = 10 } = req.query;
    const [error, paginationEntity] = PaginationEntity.create( +page, +limit );
    if (error) return res.status(400).json({ error });
    
    this.dataSourceService.getAll(paginationEntity!)
      .then( dataSources => res.json(dataSources))
      .catch(error => this.handleError(error, res));
  };
}