## 极简风格的 Web 服务端框架 Lightning

坚持 SQL 一等公民的地位，使用了类似 Java 中 MyBatis 的设计。（感谢 nodebatis，本项目使用其 fork 版本，@wolfx/nodebatis）

坚持约定大于配置的原则，使开发更简单。

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

如需完整的 ES6 和 flow 支持

```json
{
  "babel-plugin-syntax-async-functions": "^6.13.0",
  "babel-plugin-transform-regenerator": "^6.26.0",
  "babel-polyfill": "^6.26.0",
  "babel-preset-env": "^1.7.0",
  "babel-preset-flow": "^6.23.0",
  "babel-register": "^6.26.0"
}
```

```javascript
// 【推荐】如需完整的ES6支持，如import关键词
require("babel-register")({
  presets: ["env", "flow"],
  plugins: ["syntax-async-functions", "transform-regenerator", "babel-polyfill"]
});

const Lightning = require("@wolfx/lightning");
const path = require("path");
Lightning.core.setConfig({
  database: {
    debug: true, // debug模式下将输出sql语句
    dialect: "mysql", // 目前只支持mysql
    host: "xxx.xxx.x.xxx",
    port: 3306,
    database: "xxx",
    user: "xxx",
    password: "xxxxxx"
  },
  cors: {
    allowedOrigins: ["*"]
  },
  storage: path.resolve(__dirname, "./public/upload"), // 文件上传路径，public为默认的静态资源路径
  yaml: path.resolve(__dirname, "./yaml"), // yml sql 文件夹
  routerDir: path.resolve(__dirname, "./router") // 路由文件夹
});
Lightning.core.start(3001);
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
import Lightning from "@wolfx/lightning";
const database = Lightning.core.getState().database;

const findByAge = async () => {
  const result = await database.execute("test.findByAge", {
    age: 18
  });
  return result;
};

export { findByAge };
```

#### 第三步：定义路由来接收请求，并返回结果

在 `router` 中新建一个 `user.js` 文件，名字随意。路由用法与 express 框架一致。

```javascript
import Lightning from "@wolfx/lightning";
import { findByAge } from "../service/user";
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
