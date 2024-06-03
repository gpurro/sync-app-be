import { GenericService } from './generic.service';
import { EntityEntity } from '@entities';
import { PcGroupsEntityManager } from '../../plugins/entities/pc-groups';
import { type IEntity } from '@interfaces/entities';
import { type IEntityRepository } from '@interfaces/repositories';
import { CustomError } from 'domain/errors/custom.error';

export class EntityService extends GenericService<IEntity, EntityEntity>{

  // DI
  constructor(
    protected readonly repository: IEntityRepository
  ) { 
    super(
      'entity',
      repository
    );
  }
  
  async initializeRecords(id:string) {
    
    try {
      const entityEnity = await this.repository.getById(id);
      
      // if (document){
      //   await document.populate('dataSource', 'appName apiUrl apiAuthorizationType apiAuthorizationCredentials');
      // }
  
      // const entityManager = new PcGroupsEntityManager(this);
      // const [error, entity] = EntityEntity.createFromObject(document.toObject());
      // if (error) throw new Error(error);
  
      // const pojoEntity = entity?.toObject();
      
      // return entityManager.initializeRecords(pojoEntity!);
      
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}

