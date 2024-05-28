import { environment } from "./config/environment";
import { AppRouter } from "./presentation/app-router";
import { AppServer } from "./presentation/app-server";

(async()=> {
  await main();
})();

async function main() {

  const server = new AppServer({
    port: environment.PORT,
    publicPath: environment.PUBLIC_PATH,
    router: AppRouter.router
  });
  await server.start();

}