import { LightningConfig } from "./config-default";
import { Application } from "express";
import * as multer from "multer";
export declare function setConfig(cfg: LightningConfig): void;
declare type LightningState = {
    app: Application;
    upload: multer.Instance;
    config: LightningConfig;
};
export declare function start(port: number, callback: (ipArray: string[]) => void): LightningState;
export declare function getState(): LightningState;
export {};
