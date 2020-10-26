import { Server } from "../index";
import { RouteCallbackParams } from "./Server";
import { RouterClass, RouterMapper } from "../decorator";

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

@RouterClass()
class DemoRouter {
  @RouterMapper(server, Server.GET, "/:id/:type")
  async getData(data: RouteCallbackParams) {
    return data;
  }
}
