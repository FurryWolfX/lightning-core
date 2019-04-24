import NodeBatisLite, { NodeBatisLiteConfig } from "@wolfx/nodebatis-lite";
import { Application } from "express";
import { Instance as MulterInstance } from "multer";

export interface LightningCorsConfig {
  allowedOrigins: Array<string>;
}

export interface LightningConfig {
  database: NodeBatisLiteConfig | boolean;
  cors: LightningCorsConfig;
  responseLogCallback: Function;
  requestLogCallback: Function;
  storage: string;
  yaml: string;
  routerDir: string;
}

export interface LightningState {
  app: Application;
  upload: MulterInstance;
  database: NodeBatisLite;
  config: LightningConfig;
}

export interface LightningCore {
  setConfig(cfg: LightningConfig): void;

  start(port: number, callback?: Function): void;

  getState(): LightningState;
}

export var core: LightningCore;

export default class Lightning {
  static core: LightningCore;
}
