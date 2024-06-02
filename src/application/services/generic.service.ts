import { GenericModel } from "../../infrastructure";
import { CustomError, PaginationEntity, GenericEntity } from '../../domain';

export abstract class GenericService {

  constructor(
    public readonly resourceName: string,
    public readonly genericModel: GenericModel<any>
  ) {
  }

  async create(genericEntity: GenericEntity) {

    const documentExists = await this.genericModel.findOne({ name: genericEntity.name });
    if (documentExists) throw CustomError.badRequest( 'Document already exists with the same name' );

    try {
      const document = new this.genericModel( {
        ...genericEntity,
        // user: user.id,
      } );

      await document.save();

      return document.toObject();

    } catch ( error ) {
      throw CustomError.internalServer(`${ error }`);
    }    
  }
  
  async getOne(id:string) {
    try {
      const document = await this.genericModel.findById(id).exec();
      return document;

    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  async getAll(paginationEntity: PaginationEntity) {

    const { page, limit } = paginationEntity;

    try {
      const [total, documents] = await Promise.all([
        this.genericModel.countDocuments(),
        this.genericModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
      ]);

      return {
        page,
        limit,
        total,
        next: `/api/${ this.resourceName }?page=${ (page + 1) }&limit=${ limit }`,
        prev: (page - 1 > 0) ? `/api/${ this.resourceName }?page=${ (page - 1) }&limit=${ limit }`: null,
        data: documents.map(document => ( document.toObject() ))
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }

}