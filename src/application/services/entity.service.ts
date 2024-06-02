import { EntityModel } from '../../infrastructure';
import { CustomError, EntityEntity } from '../../domain';
import { PcGroupsEntityManager } from '../../plugins/entities/pc-groups';
import { GenericService } from './generic.service';

export class EntityService extends GenericService {

  // DI
  constructor() { 
    super(
      'entity', 
      EntityModel
    );
  }

  async initializeRecords(id:string) {
    
    try {
      const document = await this.genericModel.findById(id).exec();
      
      if (document){
        await document.populate('dataSource', 'appName apiUrl apiAuthorizationType apiAuthorizationCredentials');
      }

      const entityManager = new PcGroupsEntityManager(this);
      const [error, entity] = EntityEntity.createFromObject(document.toObject());
      if (error) throw new Error(error);

      const pojoEntity = entity?.toObject();
      
      return entityManager.initializeRecords(pojoEntity!);
      
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }

}


