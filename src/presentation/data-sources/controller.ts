import { Response, Request } from 'express';
import { CustomError  } from '../../domain';
import { DataSourceService } from './service';

export class DataSourceController {

  // DI
  constructor(
    private readonly dataSourceService: DataSourceService,
  ) { }


  private handleError = (error: unknown, res: Response) => {
    console.log( `${ error }` );
    return res.status(500).json({ error: 'Internal server error', details: error });
  };


  getAll = async (req: Request, res: Response) => {

    const { page = 1, limit = 10 } = req.query;
    // const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
    // if ( error ) return res.status(400).json({ error });
    
    this.dataSourceService.getAll()
      .then( dataSources => res.json(dataSources))
      .catch(error => this.handleError(error, res));

  };
}