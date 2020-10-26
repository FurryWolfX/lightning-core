## 极简风格的 Web 服务端框架 Lightning

超轻量，易于上手。坚持约定大于配置的原则，使开发更简单。

需要配合 `lightning-template` 和 `lightning-generator` 一起使用效果最佳。

关于 `lightning-template` 和 `lightning-generator` 可以在 Github 获取。

目前作为公司内部使用。

## 5.x 更新``

重写了全部代码，与 4.x 不兼容。

```typescript
import { Server, RouteCallbackParams, RouteCallbackCtx } from "@wolfx/lightning";

const server = new Server({ port: 5000, staticDir: "" });
/*
自定义logger
server.setLogger({
  log: console.log,
  warn: console.warn,
  error: console.error
});
自定义response header
server.setRequestInterceptor(async (req, res) => {
  res.setHeader("test", "test");
});
*/
server.addRoute(Server.GET, "/test", async (data: RouteCallbackParams, ctx: RouteCallbackCtx) => {
  return data.query;
});
server.addRoute(Server.POST, "/", async (data: RouteCallbackParams, ctx: RouteCallbackCtx) => {
  return data.fields;
});
server.start();
```

如果你喜欢用装饰器，也可以这样使用：

```typescript
import { Server, RouteCallbackParams, RouteCallbackCtx, RouterClass, RouterMapper } from "@wolfx/lightning";

const server = new Server({ port: 5000 });
server.start();

@RouterClass()
class DemoRouter {
  @RouterMapper(server, Server.GET, "/")
  async getData(data: RouteCallbackParams, ctx: RouteCallbackCtx) {
    console.log(data.query);
    return data.query;
  }
}
```

使用动态路由

```typescript
@RouterClass()
class DemoRouter {
  @RouterMapper(server, Server.GET, "/:id/:type")
  async getData(data: RouteCallbackParams, ctx: RouteCallbackCtx) {
    return {
      query: data.query,
      params: data.params
    };
  }
}
```
