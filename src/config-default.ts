import { LightningConfig } from "./type";

const defaultConfig: LightningConfig = {
  cors: true,
  static: "public",
  storage: "",
  routerDir: "",
  websocket: null
};

export default defaultConfig;
