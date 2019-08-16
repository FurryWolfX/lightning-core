export type LightningCorsConfig = {
  allowedOrigins: Array<string>;
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
  cors: LightningCorsConfig;
  static: string;
  responseLogCallback?: (method, url, time) => void;
  requestLogCallback?: (method, url) => void;
  storage: string;
  routerDir: string;
};

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
