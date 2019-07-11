const fs = require("fs");
const path = require("path");
const express = require("express");
const _ = require("lodash");

const getIpArray = require("./utils/ip");
const validate = require("./config-validator");
const { getUpload } = require("./upload");
const applyMiddleware = require("./config-middleware");
const defaultConfig = require("./config-default");
const readFileList = require("./utils/readFileList");

let app, upload;
let isStarted = false;
let config = {};

const setConfig = cfg => {
  config = Object.assign(defaultConfig, cfg);
  app = express();
  validate(config);
  applyMiddleware(app, config);
  upload = getUpload(config);
};

const start = (port, callback) => {
  if (isStarted === false) {
    isStarted = true;
    const routers = _.sortBy(readFileList(config.routerDir), po => {
      if (po.filename === "index.js") {
        // index.js 放第一路由
        return -1;
      }
    });
    routers.forEach(po => {
      console.log("init router", po.path + "/" + po.filename);
      require(po.path + "/" + po.filename);
    });
    app.listen(port, () => {
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
  return { app, upload, config };
};

module.exports = {
  setConfig,
  start,
  getState: () => {
    return { app, upload, config };
  }
};
