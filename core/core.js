const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("express-cors");
const multer = require("multer");
const NodeBatis = require("@wolfx/nodebatis");
const md5 = require("./util/md5");

let config = {
  cors: {
    allowedOrigins: ["*"]
  },
  static: "public",
  storage: "",
  yaml: "",
  routerDir: "",
  database: {
    debug: true,
    dialect: "",
    host: "",
    port: null,
    database: "",
    user: "",
    password: ""
  }
};

let app, storage, upload, database;

const setConfig = cfg => {
  config = Object.assign(config, cfg);
  if (!config.storage) {
    console.error("config.storage", "undefined");
    process.exit();
  }
  if (!config.yaml) {
    console.error("config.yaml", "undefined");
    process.exit();
  }
  if (!config.routerDir) {
    console.error("config.routerDir", "undefined");
    process.exit();
  }
  if (!config.database.dialect) {
    console.error("config.database.dialect", "undefined");
    process.exit();
  }
  if (!config.database.host) {
    console.error("config.database.host", "undefined");
    process.exit();
  }
  if (!config.database.port) {
    console.error("config.database.port", "undefined");
    process.exit();
  }
  if (!config.database.database) {
    console.error("config.database.database", "undefined");
    process.exit();
  }
  if (!config.database.user) {
    console.error("config.database.user", "undefined");
    process.exit();
  }
  if (!config.database.password) {
    console.error("config.database.password", "undefined");
    process.exit();
  }

  app = express();

  app.use(cors(config.cors));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(config.static));

  // 文件上传
  // 参考：https://blog.csdn.net/jishoujiang/article/details/80367683
  storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, config.storage);
    },
    filename: function(req, file, cb) {
      // cb(null, file.originalname);
      let ext = file.originalname.split(".");
      let extName = "";
      if (ext.length > 1) {
        extName = ext[ext.length - 1];
      }
      cb(null, md5(new Date().getTime() + "-" + file.originalname) + "." + extName);
    }
  });
  upload = multer({
    storage: storage
  });

  database = new NodeBatis(config.yaml, config.database);
};

const start = port => {
  // 读取路由文件
  const routers = fs.readdirSync(config.routerDir);
  routers.forEach(p => require(path.resolve(config.routerDir, p)));
  app.listen(port, () => console.log(`Server listening on port ${port}!`));
  return { app, upload, database, config };
};

module.exports = {
  setConfig,
  start,
  getState: function() {
    return { app, upload, database, config };
  }
};
