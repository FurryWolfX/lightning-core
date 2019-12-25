import * as express from "express";
import * as path from "path";
import * as _ from "lodash";

import getIpArray from "./utils/ip";
import validate from "./config-validator";
import getUpload from "./upload";
import applyMiddleware from "./config-middleware";
import defaultConfig from "./config-default";
import readFileList, { FileItem } from "./utils/readFileList";
import { Application } from "express";
import * as multer from "multer";
import { LightningConfig, LightningState } from "./type";

let app: Application;
let upload: multer.Instance;
let isStarted = false;
let config: LightningConfig = defaultConfig;

export function setConfig(cfg: LightningConfig) {
  config = Object.assign(config, cfg);
  app = express();
  validate(config);
  applyMiddleware(app, config);
  upload = getUpload(config);
}

export function start(port: number, callback?: (ipArray: string[]) => void): LightningState {
  if (isStarted === false) {
    isStarted = true;
    const routers: FileItem[] = _.sortBy(readFileList(config.routerDir), (po: FileItem) => {
      if (po.filename === "index.js") {
        // index.js 放第一路由
        return -1;
      }
    });
    routers.forEach(po => {
      const nameArray = po.filename.split(".");
      const extName = nameArray[nameArray.length - 1];
      if (extName === "js") {
        require(path.resolve(po.path, po.filename));
      }
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
}

export function getState(): LightningState {
  return { app, upload, config };
}
