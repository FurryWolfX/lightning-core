import { Application } from "express";
import { LightningConfig } from "./type";
declare function apply(app: Application, config: LightningConfig): void;
export default apply;
