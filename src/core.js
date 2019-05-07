const fs = require("fs");
const path = require("path");
const express = require("express");

const getIpArray = require("./utils/ip");
const validate = require("./config-validator");
const { getDatabase } = require("./database");
const { getUpload } = require("./upload");
const applyMiddleware = require("./config-middleware");
const defaultConfig = require("./config-default");
const { initWebsocket } = require("./websocket/ws");

let app, upload, database;
let isStarted = false;
let config = {};
let websocketServer = null;

const setConfig = cfg => {
  config = Object.assign(defaultConfig, cfg);
  app = express();
  validate(config);
  applyMiddleware(app, config);
  upload = getUpload(config);
  database = getDatabase(config);
  websocketServer = initWebsocket(config.websocket);
};

const start = (port, callback) => {
  if (isStarted === false) {
    const routers = fs.readdirSync(config.routerDir);
    routers.forEach(p => require(path.resolve(config.routerDir, p)));
    app.listen(port, () => {
      isStarted = true;
      const ipArray = getIpArray();
      if (typeof callback === "function") {
        callback(ipArray);
      } else {
        ipArray.forEach(ip => console.log(`Lightning Server listening on http://${ip}:${port}!`));
      }
    });
  } else {
    console.warn("Lightning Server has been started");
  }
  return { app, upload, database, config };
};

module.exports = {
  setConfig,
  start,
  getState: () => {
    return { app, upload, database, websocketServer, config };
  }
};
