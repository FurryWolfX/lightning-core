## 极简风格的 Web 服务端框架 Lightning

坚持约定大于配置的原则，使开发更简单。

框架是在 Express 的基础上进行的拓展，目标是易于代码生成和 API 快速开发。需要配合 `lightning-template` 和 `lightning-generator` 一起使用效果最佳。

关于 `lightning-template` 和 `lightning-generator` 可以在 Github 获取。

目前作为公司内部使用。

## 3.x 版本说明

使用 TypeScript 重写了项目

## 2.x 版本说明

2.x 中将数据库持久层移出了核心项目。需要 database 模块的请使用 1.x

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

```javascript
const Lightning = require("@wolfx/lightning");
const path = require("path");
Lightning.setConfig({
  cors: true,
  requestLogCallback: (method, url) => {
    // 请求日志
    console.log(`${method} ${url}`);
  },
  responseLogCallback: (method, url, time) => {
    // 响应日志，可获得响应时间，用于性能分析
    console.log(`${method} ${url} ${time}ms`);
  },
  storage: path.resolve(__dirname, "./public/upload"), // 文件上传路径，public为默认的静态资源路径
  routerDir: path.resolve(__dirname, "./router") // 路由文件夹
});
Lightning.core.start(3001);

// 获取运行状态
const { app, upload } = Lightning.core.getState();
```

### 从一个简单的查询开始

#### 定义路由

在 `router` 中新建一个 `user.js` 文件，名字随意。路由用法与 express 框架一致。

```javascript
const Lightning = require("@wolfx/lightning");
const { findByAge } = require("../service/user"); // 编写你的业务，可以选你自己喜欢的 DB 框架
const app = Lightning.core.getState().app;

// 登录拦截例子
app.all("/*", function(req, res, next) {
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

### 可选：配置 websocket 服务

```bash
# 需要额外安装 nodejs-websocket
npm i nodejs-websocket --save
```

```javascript
Lightning.setConfig({
  websocket: {
    wsLimit: 1000,
    heartbeatTimeout: 6000,
    onConnected: conn => {},
    onText: (str, conn) => {},
    onClose: (code, reason, conn) => {},
    onError: (code, reason, conn) => {}
  }
  //...
});

Lightning.websocket.start(3002);
```
