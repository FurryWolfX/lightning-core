import { Server } from "../index";
import { RouteCallbackParams } from "./Server";
import { routerClass, routerMapper } from "../decorator";

const server = new Server({ port: 5000 });
// server.addRoute(Server.GET, "/test", async data => {
//   return data.query;
// });
// server.addRoute(Server.POST, "/", async data => {
//   return data.fields;
// });
server.start();

@routerClass()
class DemoRouter {
  @routerMapper(server, Server.GET, "/")
  async getData(data: RouteCallbackParams) {
    console.log(data.query);
    return data.query;
  }
}
