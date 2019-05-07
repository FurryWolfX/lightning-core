const NodeBatisLite = require("@wolfx/nodebatis-lite");

module.exports.getDatabase = function(config) {
  // 是否需要启用数据库
  if (config.database) {
    return new NodeBatisLite(config.yaml, config.database);
  } else {
    return null;
  }
};
