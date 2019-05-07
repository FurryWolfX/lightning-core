import NodeBatisLite, { NodeBatisLiteConfig } from "@wolfx/nodebatis-lite";
import { Application } from "express";
import { Instance as MulterInstance } from "multer";
import { Server } from "./nodejs-websocket";

export interface LightningCorsConfig {
  allowedOrigins: Array<string>;
}

export interface LightningWebsocketConfig {
  wsLimit?: number;
  heartbeatTimeout: number;
  onConnected?: Function;
  onText?: Function;
  onClose?: Function;
  onError?: Function;
}

export interface LightningConfig {
  database?: NodeBatisLiteConfig | boolean;
  websocket?: LightningWebsocketConfig | boolean;
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
  config: LightningConfig;
}

export interface LightningWebsocketState {
  server: Server
}

export interface LightningWebsocket {
  start(port: number, callback?: Function): void;
  getState(): LightningWebsocketState;
}

export interface LightningCore {
  setConfig(cfg: LightningConfig): void;
  start(port: number, callback?: Function): void;
  getState(): LightningState;
}

export function setConfig(cfg: LightningConfig): void;
export const core: LightningCore;
export const websocket: LightningWebsocket;

export default class Lightning {
  static setConfig(cfg: LightningConfig): void;
  static core: LightningCore;
  static websocket: LightningWebsocket;
}
