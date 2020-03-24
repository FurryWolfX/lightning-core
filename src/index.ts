import * as core from "./core";

class Lightning {
  static core: typeof core = core;
  static setConfig: typeof core.setConfig = core.setConfig;
}

export default Lightning;
