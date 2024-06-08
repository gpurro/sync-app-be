import { GenericService } from './generic.service';
import { EntityEntity } from '@entities';
import { type IEntityRepository } from '@interfaces/repositories';
import { EntityManagerPluginType } from '@plugin-types';
import { CustomError } from 'domain/errors/custom.error';
import { RecordService } from './record.service';

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
      const leanDocument = await this.repository.findById(id) as EntityEntity;
      const entity = new EntityEntity(leanDocument);
      
      // Load the plugin
      const entityManager = this.pluginManager.loadPlugin<EntityManagerPluginType>(entity?.pluginName!);

      // init the plugin
      entityManager.init({
        dataSourceManagerPluginName: 'PlanningCenter.DataSourceManager',
        entity: entity!,
      });

      // if (document){
      //   await document.populate('dataSource', 'appName apiUrl apiAuthorizationType apiAuthorizationCredentials');
      // }
  
      // const entityManager = new PcGroupsEntityManager(this);
      // const [error, entity] = EntityEntity.createFromObject(document.toObject());
      // if (error) throw new Error(error);
  
      // const pojoEntity = entity?.toObject();
      
      return entityManager.initializeRecords();
      
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}

