import { LightningConfig, LightningState } from "./type";
export declare function setConfig(cfg: LightningConfig): void;
export declare function start(port: number, callback?: (ipArray: string[]) => void): LightningState;
export declare function getState(): LightningState;
