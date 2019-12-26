const Lightning = require("../dist").default;
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
  compression: true, // gzip 支持
  storage: path.resolve(__dirname, "./public/upload"),
  routerDir: path.resolve(__dirname, "./router")
  // serviceCenter: {
  //   centerUrl: "http://127.0.0.1:3000/register",
  //   serviceName: "test-service-2",
  //   serviceUrl: "http://127.0.0.1:3001/" // 末尾要加"/"
  // }
});
Lightning.core.start(3001);
// Lightning.websocket.start(3002);
