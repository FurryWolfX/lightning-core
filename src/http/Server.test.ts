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
// server.setRequestInterceptor(async (req, res) => {
//   res.setHeader("test", "test");
// });
server.start();

@routerClass()
class DemoRouter {
  @routerMapper(server, Server.GET, "/:id/:type")
  async getData(data: RouteCallbackParams) {
    return data;
  }
}
