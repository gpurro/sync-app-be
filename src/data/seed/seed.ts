import { environment as env } from '../../config';
import { DataSourceModel, MongoDb } from '../mongo';
import { seedData } from './data';


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
  ]);

  // 1. Create DataSources
  const users = await DataSourceModel.insertMany( seedData.dataSources );

  // end
  console.log('Data seeded!');
}