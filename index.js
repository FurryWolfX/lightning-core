const core = require("./src/core");
const websocket = require("./src/websocket");
module.exports = {
  setConfig: core.setConfig,
  core,
  websocket
};
