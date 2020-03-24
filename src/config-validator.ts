/**
 * @description 验证设置
 */
import { LightningConfig } from "./type";

const validate = (config: LightningConfig) => {
  if (!config.storage) {
    console.error("config.storage is undefined");
    process.exit();
  }
  if (!config.routerDir) {
    console.error("config.routerDir is undefined");
    process.exit();
  }
};

export default validate;
