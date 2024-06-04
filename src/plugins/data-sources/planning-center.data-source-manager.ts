import { IDataSource } from '@interfaces/entities';
import { GenericDataSourceManager } from './generic.data-source-manager';

class PlanningCenterDataSourceManager extends GenericDataSourceManager {
  
  constructor(dataSource: IDataSource) {
    super(dataSource);
  }
} 

export default PlanningCenterDataSourceManager;