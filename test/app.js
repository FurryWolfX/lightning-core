const Lightning = require("../index");
const path = require("path");
Lightning.core.setConfig({
  // database: {
  //   debug: true,
  //   dialect: "mysql",
  //   host: "192.168.1.22",
  //   port: 3306,
  //   database: "test",
  //   user: "root",
  //   password: "junlian"
  // },
  websocket: {
    wsLimit: 1000,
    heartbeatTimeout: 6000,
    onConnected: conn => {},
    onText: (str, conn) => {},
    onClose: (code, reason, conn) => {},
    onError: (code, reason, conn) => {}
  },
  storage: path.resolve(__dirname, "./public/upload"),
  yaml: path.resolve(__dirname, "./yaml"),
  routerDir: path.resolve(__dirname, "./router")
});
Lightning.core.start(3001);
Lightning.websocket.start(3002);
