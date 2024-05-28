import { DataSourceModel } from '../../data';
import { CustomError, DataSourceEntity, PaginationEntity } from '../../domain';

export class DataSourceService {

  // DI
  constructor() { }

  async create(dataSourceEntity: DataSourceEntity) {

    const dataSourceExists = await DataSourceModel.findOne( { name: dataSourceEntity.name } );
    if (dataSourceExists) throw CustomError.badRequest( 'DataSource already exists with the same name' );

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

  async getAll(paginationEntity: PaginationEntity) {

    const { page, limit } = paginationEntity;

    try {
      const [total, dataSources ] = await Promise.all( [
        DataSourceModel.countDocuments(),
        DataSourceModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )
      ] );

      return {
        page,
        limit,
        total,
        next: `/api/data_source?page=${ (page + 1) }&limit=${ limit }`,
        prev: (page - 1 > 0) ? `/api/data_source?page=${ (page - 1) }&limit=${ limit }`: null,
        data: dataSources.map( dataSource => ( {
          id: dataSource._id,
          name: dataSource.name,
        } ) )
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }

}


