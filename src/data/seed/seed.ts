import { environment as env } from '@config';
import { DataSourceModel, EntityModel, MongoDb } from '../../infrastructure';
import { seedData } from './data';
import { IEntity } from '@interfaces/entities';


(async()=> {
  await MongoDb.connect({
    dbName: env.MONGO_DB_NAME,
    mongoUrl: env.MONGO_URL
  })

  await main();

  await MongoDb.disconnect();
})();

async function main() {

  // 0. delete all!
  await Promise.all([
    DataSourceModel.deleteMany(),
    EntityModel.deleteMany()
  ]);

  // 1. Create DataSources
  const dataSources = await DataSourceModel.insertMany( seedData.dataSources );

  // 3. Create Entities
  const products = await EntityModel.insertMany(
    seedData.entities.map((entity: IEntity) => {

      const dataSource = dataSources.find( dataSource => entity.dataSource==dataSource.name );

      if (!dataSource) throw new Error(`Error importing Entities. No dataSourceId found ${ JSON.stringify(entity) }`) ;
      
      return {
        ...entity,
        dataSource: dataSource._id
      }


    })
  );

  // end
  console.log('Data seeded!');
}