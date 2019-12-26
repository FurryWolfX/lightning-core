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
  responseLogCallback?: (method: string, url: string, time: number) => void;
  requestLogCallback?: (method: string, url: string) => void;
  storage: string;
  routerDir: string;
  serviceCenter?: {
    centerUrl: string;
    serviceName: string;
    serviceUrl: string;
  };
};
