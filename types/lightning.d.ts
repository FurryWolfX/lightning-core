import NodeBatisLite, { NodeBatisLiteConfig } from "@wolfx/nodebatis-lite";
import { Application } from "express";
import { Instance as MulterInstance } from "multer";
import { Ws } from "./nodejs-websocket";

export interface LightningCorsConfig {
  allowedOrigins: Array<string>;
}

export interface LightningWebsocketConfig {
  wsPort: number;
  wsLimit?: number;
  heartbeatTimeout: number;
  onConnected?: Function;
  onText?: Function;
  onClose?: Function;
  onError?: Function;
}

export interface LightningConfig {
  database: NodeBatisLiteConfig | boolean;
  websocket: LightningWebsocketConfig | boolean;
  cors: LightningCorsConfig;
  responseLogCallback(method, url, time): void;
  requestLogCallback(method, url): void;
  storage: string;
  yaml: string;
  routerDir: string;
}

export interface LightningState {
  app: Application;
  upload: MulterInstance;
  database: NodeBatisLite;
  websocketServer: Ws;
  config: LightningConfig;
}

export interface LightningCore {
  setConfig(cfg: LightningConfig): void;

  start(port: number, callback?: Function): void;

  getState(): LightningState;
}

export const core: LightningCore;

export default class Lightning {
  static core: LightningCore;
}
