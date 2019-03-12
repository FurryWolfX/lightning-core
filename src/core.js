const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("express-cors");
const multer = require("multer");
const NodeBatisLite = require("@wolfx/nodebatis-lite");
const md5 = require("./utils/md5");
const getIpArray = require("./utils/ip");

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
    password: "",
    pool: {
      minSize: 5,
      maxSize: 20,
      connectionLimit: 5
    }
  }
};

let app, storage, upload, database;

const setConfig = cfg => {
  config = Object.assign(config, cfg);
  if (!config.storage) {
    console.error("config.storage is undefined");
    process.exit();
  }
  if (!config.yaml) {
    console.error("config.yaml is undefined");
    process.exit();
  }
  if (!config.routerDir) {
    console.error("config.routerDir is undefined");
    process.exit();
  }
  if (!config.database.dialect) {
    console.error("config.database.dialect is undefined");
    process.exit();
  }
  if (!config.database.host) {
    console.error("config.database.host is undefined");
    process.exit();
  }
  if (!config.database.port) {
    console.error("config.database.port is undefined");
    process.exit();
  }
  if (!config.database.database) {
    console.error("config.database.database is undefined");
    process.exit();
  }
  if (!config.database.user) {
    console.error("config.database.user is undefined");
    process.exit();
  }
  if (!config.database.password) {
    console.error("config.database.password is undefined");
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

  database = new NodeBatisLite(config.yaml, config.database);
};

const start = (port, callback) => {
  const routers = fs.readdirSync(config.routerDir);
  routers.forEach(p => require(path.resolve(config.routerDir, p)));
  app.listen(port, () => {
    if (typeof callback === "function") {
      callback();
    } else {
      console.log(`Server listening on http://${getIpArray()}:${port}!`);
    }
  });
  return { app, upload, database, config };
};

module.exports = {
  setConfig,
  start,
  getState: function() {
    return { app, upload, database, config };
  }
};
