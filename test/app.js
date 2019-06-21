const Lightning = require("../index");
const path = require("path");
Lightning.setConfig({
  websocket: {
    wsLimit: 1000,
    heartbeatTimeout: 6000,
    onConnected: conn => {},
    onText: (str, conn) => {},
    onClose: (code, reason, conn) => {},
    onError: (code, reason, conn) => {}
  },
  storage: path.resolve(__dirname, "./public/upload"),
  routerDir: path.resolve(__dirname, "./router")
});
Lightning.core.start(3001);
Lightning.websocket.start(3002);
