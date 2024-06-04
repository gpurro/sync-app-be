import { GenericService } from './generic.service';
import { EntityEntity } from '@entities';
import { type IEntityRepository } from '@interfaces/repositories';
import { CustomError } from 'domain/errors/custom.error';

export class EntityService extends GenericService<EntityEntity>{

  // DI
  constructor(
    protected readonly repository: IEntityRepository
  ) { 
    super(
      repository,
      'entity',
    );
  }
  
  async initializeRecords(id:string) {
    
    try {
      const entityEnity = await this.repository.getOne(id);
      console.log(entityEnity);
      
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

