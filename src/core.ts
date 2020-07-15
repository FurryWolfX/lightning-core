import * as express from "express";

import getIpArray from "./utils/ip";
import validate from "./config-validator";
import getUpload from "./upload";
import applyMiddleware from "./config-middleware";
import defaultConfig from "./config-default";
import { Application } from "express";
import { LightningConfig, LightningState } from "./type";

let app: Application;
let upload: any;
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
    app.listen(port, () => {
      const ipArray = getIpArray();
      if (typeof callback === "function") {
        callback(ipArray);
      } else {
        ipArray.forEach(ip => console.log(`Lightning Server listening on http://${ip}:${port}`));
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
