import { environment } from "./config/environment";
import { DataSourceModel, MongoDb } from "./data";
import { AppRouter } from "./presentation/app.router";
import { AppServer } from "./presentation/app.server";

(async()=> {
  await main();
})();

async function main() {

  await MongoDb.connect({
    dbName: environment.MONGO_DB_NAME,
    mongoUrl: environment.MONGO_URL,
  });

  const dataSource = new DataSourceModel({
    name: 'test 1'
  });
  await dataSource.save();

  const server = new AppServer({
    port: environment.PORT,
    publicPath: environment.PUBLIC_PATH,
    router: AppRouter.router
  });
  await server.start();

}
