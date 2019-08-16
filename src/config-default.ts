import { LightningConfig } from "./type";

const defaultConfig: LightningConfig = {
  cors: {
    allowedOrigins: ["*"]
  },
  static: "public",
  storage: "",
  routerDir: "",
  websocket: null
};

export default defaultConfig;
