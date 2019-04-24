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
};

module.exports = validate;
