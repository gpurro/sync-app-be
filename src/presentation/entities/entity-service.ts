import { EntityModel } from '../../data';
import { CustomError, EntityEntity } from '../../domain';
import { ApiBaseService } from '../api-base/api-base.service';

export class EntityService extends ApiBaseService {

  // DI
  constructor() { 
    super(
      'entity', 
      EntityModel, 
      EntityEntity
    );
  }

  async initializeRecords(id:string) {
    
    try {
      const document = await this.genericModel.findById(id).exec();
      
      if (document){
        await document.populate('dataSource', 'appName apiUrl apiAuthorizationType apiAuthorizationCredentials');
      }
      return document;
      
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }

}


