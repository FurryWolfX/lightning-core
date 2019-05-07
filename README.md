## 极简风格的 Web 服务端框架 Lightning

坚持 SQL 一等公民的地位，使用了类似 Java 中 MyBatis 的设计。（感谢 nodebatis，本项目使用其重构简化版本，@wolfx/nodebatis-lite）

坚持约定大于配置的原则，使开发更简单。

框架是在 Express 的基础上进行的拓展，目标是易于代码生成和 API 快速开发。需要配合 `lightning-template` 和 `lightning-generator` 一起使用效果最佳。

关于 `lightning-template` 和 `lightning-generator` 可以在 Github 获取。

目前作为公司内部使用，使用 MIT 开源协议。

### 安装

```bash
# 需要额外安装 mysql
npm i @wolfx/lightning mysql --save
```

### 项目结构

Lightning 使用约定大于配置的理念。约定的结构如下：

```
- root
--- model 存放模型文件（可选）
--- public 默认静态资源根目录
--- router 路径定义放这里面，server启动时Lightning会扫描目录下的文件并读取路由
--- service 业务逻辑在这里写
--- yaml sql在这里写
```

### 启动服务

```javascript
const Lightning = require("@wolfx/lightning");
const path = require("path");
Lightning.core.setConfig({
  database: {
    // 如果不需要连接数据库，这里可以设置为false
    // database 更多的配置可以参考NodeBatisLite的文档
    debug: true, // debug模式下将输出sql语句
    debugCallback: (key, sql, params) => {
      // 这里可以接入log4js等
      // 使用debugCallback后debug不会输出log，需要在回调中自己处理
    },
    dialect: "mysql", // 目前只支持mysql，需要单独安装（npm i mysql --save）
    host: "xxx.xxx.x.xxx",
    port: 3306,
    database: "xxx",
    user: "xxx",
    password: "xxxxxx",
    camelCase: true, // 是否使用驼峰参数和返回结果
    pool: {
      minSize: 5,
      maxSize: 20,
      connectionLimit: 5
    }
  },
  cors: {
    allowedOrigins: ["*"]
  },
  requestLogCallback: (method, url) => {
    // 请求日志
    console.log(`${method} ${url}`);
  },
  responseLogCallback: (method, url, time) => {
    // 响应日志，可获得响应时间，用于性能分析
    console.log(`${method} ${url} ${time}ms`);
  },
  storage: path.resolve(__dirname, "./public/upload"), // 文件上传路径，public为默认的静态资源路径
  yaml: path.resolve(__dirname, "./yaml"), // yml sql 文件夹
  routerDir: path.resolve(__dirname, "./router") // 路由文件夹
});
Lightning.core.start(3001);
```

### 可选：配置 websocket 服务

```bash
# 需要额外安装 nodejs-websocket
npm i nodejs-websocket --save
```

```javascript
Lightning.core.setConfig({
  database: {
    //...
  },
  websocket: {
    wsPort: 3002,
    wsLimit: 1000,
    heartbeatTimeout: 6000,
    onConnected: conn => {},
    onText: (str, conn) => {},
    onClose: (code, reason, conn) => {},
    onError: (code, reason, conn) => {}
  },
  //...
});
```

### 从一个简单的查询开始

#### 第一步：编写 SQL

在 `yaml` 中新建一个 `test.yml` 文件，名字随意。

```yaml
namespace: "test"

findByAge:
  - select name, age from user where
  - age > :age
```

#### 第二步：编写业务

在 `service` 中新建一个 `user.js` 文件，名字随意。

```javascript
const Lightning = require("@wolfx/lightning");
const database = Lightning.core.getState().database;

const findByAge = async () => {
  const result = await database.query("test.findByAge", {
    age: 18
  });
  return result;
};

export { findByAge };
```

#### 第三步：定义路由来接收请求，并返回结果

在 `router` 中新建一个 `user.js` 文件，名字随意。路由用法与 express 框架一致。

```javascript
const Lightning = require("@wolfx/lightning");
const { findByAge } = require("../service/user");
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

### nodebatis-lite 使用说明

[传送门](https://www.npmjs.com/package/@wolfx/nodebatis-lite)
