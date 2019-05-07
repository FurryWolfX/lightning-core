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
  if (config.database) {
    // 启用数据库才需要校验
    if (!config.yaml) {
      console.error("config.yaml is undefined");
      process.exit();
    }
    if (!config.database.dialect) {
      console.error("config.database.dialect is undefined");
      process.exit();
    }
    if (!config.database.host) {
      console.error("config.database.host is undefined");
      process.exit();
    }
    if (!config.database.port) {
      console.error("config.database.port is undefined");
      process.exit();
    }
    if (!config.database.database) {
      console.error("config.database.database is undefined");
      process.exit();
    }
    if (!config.database.user) {
      console.error("config.database.user is undefined");
      process.exit();
    }
    if (!config.database.password) {
      console.error("config.database.password is undefined");
      process.exit();
    }
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
