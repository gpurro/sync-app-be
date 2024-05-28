import { DataSourceModel } from '../../data';
import { CustomError, DataSourceEntity } from '../../domain';

export class DataSourceService {

  // DI
  constructor() { }

  async create(dataSourceEntity: DataSourceEntity) {

    const dataSourceExists = await DataSourceModel.findOne( { name: dataSourceEntity.name } );
    if ( dataSourceExists ) throw CustomError.badRequest( 'DataSource already exists' );

    try {
      const dataSource = new DataSourceModel( {
        ...dataSourceEntity,
        // user: user.id,
      } );

      await dataSource.save();

      return {
        id: dataSource.id,
        name: dataSource.name,
      };

    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }    
  }

  async getAll() {

    try {

      const dataSources = await DataSourceModel.find();

      return {
        page: 0,
        limit: 10,
        total: 100,
        // next: `/api/categories?page=${ ( page + 1 ) }&limit=${ limit }`,
        // prev: (page - 1 > 0) ? `/api/categories?page=${ ( page - 1 ) }&limit=${ limit }`: null,
        data: dataSources.map( dataSource => ( {
          id: dataSource._id,
          name: dataSource.name,
        } ) )
      };
    } catch (error) {
      console.log(error);
    }

  }

}


