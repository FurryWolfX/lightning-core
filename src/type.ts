import { Application } from "express";

export type LightningState = {
  app: Application;
  upload: any;
  config: LightningConfig;
};

export type LightningConfig = {
  cors?: boolean;
  static?: string;
  responseLogCallback?: (method: string, url: string, time: number) => void;
  requestLogCallback?: (method: string, url: string) => void;
  storage: string;
  routerDir: string;
  compression?: boolean;
  serviceCenter?: {
    centerUrl: string;
    serviceName: string;
    serviceUrl: string;
  };
};
