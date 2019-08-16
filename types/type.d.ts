import { Application } from "express";
import * as multer from "multer";
import { Request as Req, Response as Res, NextFunction as Next } from "express";
export declare type LightningState = {
    app: Application;
    upload: multer.Instance;
    config: LightningConfig;
};
export declare type LightningCorsConfig = {
    allowedOrigins: Array<string>;
};
export declare type LightningWebsocketConfig = {
    wsLimit?: number;
    heartbeatTimeout: number;
    onConnected?: Function;
    onText?: Function;
    onClose?: Function;
    onError?: Function;
};
export declare type LightningConfig = {
    websocket?: LightningWebsocketConfig;
    cors?: LightningCorsConfig;
    static?: string;
    responseLogCallback?: (method: any, url: any, time: any) => void;
    requestLogCallback?: (method: any, url: any) => void;
    storage: string;
    routerDir: string;
};
export declare type Request = Req;
export declare type Response = Res;
export declare type NextFunction = Next;
