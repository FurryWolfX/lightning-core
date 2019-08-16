import { Application } from "express";
import { LightningConfig } from "./config-default";
declare function apply(app: Application, config: LightningConfig): void;
export default apply;
