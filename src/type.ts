import { Application } from "express";
import * as multer from "multer";
import { Request as Req, Response as Res, NextFunction as Next } from "express";

export type LightningState = {
  app: Application;
  upload: multer.Instance;
  config: LightningConfig;
};

export type LightningCorsConfig = {
  allowedOrigins: Array<string>;
};

export type LightningWebsocketConfig = {
  wsLimit?: number;
  heartbeatTimeout: number;
  onConnected?: Function;
  onText?: Function;
  onClose?: Function;
  onError?: Function;
};

export type LightningConfig = {
  websocket?: LightningWebsocketConfig;
  cors?: LightningCorsConfig;
  static?: string;
  responseLogCallback?: (method, url, time) => void;
  requestLogCallback?: (method, url) => void;
  storage: string;
  routerDir: string;
};

export type Request = Req;
export type Response = Res;
export type NextFunction = Next;
