import "reflect-metadata";
import { environment } from "./config/environment";
import { MongoDb } from "./infrastructure";
import { AppRouter } from "./presentation/routers/app.router";
import { AppServer } from "./presentation/app.server";
import { PluginManager } from "infrastructure/plugin-manager";
import { container } from "tsyringe";

(async()=> {
  await main();
})();

async function main() {
  
  await MongoDb.connect({
    dbName: environment.MONGO_DB_NAME,
    mongoUrl: environment.MONGO_URL,
  });
  
  const pluginManager = new PluginManager(__dirname + '/plugins');
  container.registerInstance("PluginManager", pluginManager);
  
  const configOptions =   {
    port: environment.PORT,
    publicPath: environment.PUBLIC_PATH,
    router: AppRouter.router({
      swagger: { enabled: true },
    }),
    pluginManager
  };
  const server = new AppServer(configOptions);
  await server.start();

}
