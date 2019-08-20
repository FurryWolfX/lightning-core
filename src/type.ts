import { Application } from "express";
import * as multer from "multer";

export type LightningState = {
  app: Application;
  upload: multer.Instance;
  config: LightningConfig;
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
  cors?: boolean;
  static?: string;
  responseLogCallback?: (method, url, time) => void;
  requestLogCallback?: (method, url) => void;
  storage: string;
  routerDir: string;
};
