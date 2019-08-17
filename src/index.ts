import * as core from "./core";
import * as websocket from "./websocket";

class Lightning {
  static core: typeof core = core;
  static websocket: typeof websocket = websocket;
  static setConfig: typeof core.setConfig = core.setConfig;
}

export default Lightning;
