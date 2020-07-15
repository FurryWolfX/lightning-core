## 极简风格的 Web 服务端框架 Lightning

坚持约定大于配置的原则，使开发更简单。

框架是在 Express 的基础上进行的拓展，目标是易于代码生成和 API 快速开发。需要配合 `lightning-template` 和 `lightning-generator` 一起使用效果最佳。

关于 `lightning-template` 和 `lightning-generator` 可以在 Github 获取。

目前作为公司内部使用。

## 4.1.x 更新

- 路由改为静态生成器生成。配合 `lightining-template` 使用。

## 4.x 更新

- 移除了 WebSocket，因为没有必要在 Core 中实现。
- 发布的 NPM 包去掉了 JS dist，不再支持在 JS 项目中使用 lightning，推荐使用 TS。

### 安装

```bash
# 需要额外安装 mysql
npm i @wolfx/lightning --save
```

### 项目结构

Lightning 使用约定大于配置的理念。约定的结构如下：

```
- root
--- model 存放模型文件（可选）
--- public 默认静态资源根目录
--- router 路径定义放这里面，server启动时Lightning会扫描目录下的文件并读取路由
--- service 业务逻辑在这里写
```

### 启动服务

```typescript
import Lightning from "@wolfx/lightning";
import * as path from "path";
Lightning.setConfig({
  cors: true,
  requestLogCallback: (method: string, url: string) => {
    logger.info(`[request:${process.pid}] ${method} ${url}`);
  },
  responseLogCallback: (method: string, url: string, time: number) => {
    logger.info(`[response:${process.pid}] ${method} ${url} ${time}ms`);
  },
  compression: true, // gzip 支持
  storage: path.resolve(__dirname, "../public/upload"),
});
Lightning.core.start(3001);

// 获取运行状态
const { app, upload } = Lightning.core.getState();
```

### 从一个简单的查询开始

#### 定义路由

在 `router` 中新建一个 `user.js` 文件，名字随意。路由用法与 express 框架一致。

```typescript
import Lightning from "@wolfx/lightning";
import { findByAge } from "../service/user"; // 编写你的业务，可以选你自己喜欢的 DB 框架
const app = Lightning.core.getState().app;

// 登录拦截例子
app.all("/*", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/user/login"); // 将用户重定向到登录页面
  }
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/test", async (req, res) => {
  res.send(await findByAge());
});
```

### 文件上传示例

```javascript
const { app, upload } = Lightning.core.getState();
// single 文件上传
app.post("/upload", upload.single("file"), (req, res, next) => {
  // console.log("file:" + req.file.originalname);
  // console.log(res);
  // const url = "http://" + req.headers.host + "/upload/" + req.file.filename;
  res.end(req.file.filename);
});
```
