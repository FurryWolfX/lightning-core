/**
 * @description 验证设置
 * @param {LightningConfig} config
 */
const validate = config => {
  if (!config.storage) {
    console.error("config.storage is undefined");
    process.exit();
  }
  if (!config.routerDir) {
    console.error("config.routerDir is undefined");
    process.exit();
  }
  if (config.websocket) {
    if (!config.websocket.heartbeatTimeout) {
      console.error("config.websocket.heartbeatTimeout is undefined");
      process.exit();
    }
    if (!config.websocket.onConnected) {
      console.error("config.websocket.onConnected is undefined");
      process.exit();
    }
    if (!config.websocket.onClose) {
      console.error("config.websocket.onError is undefined");
      process.exit();
    }
    if (!config.websocket.onError) {
      console.error("config.websocket.onError is undefined");
      process.exit();
    }
    if (!config.websocket.onText) {
      console.error("config.websocket.onText is undefined");
      process.exit();
    }
  }
};

module.exports = validate;
