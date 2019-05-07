const limitControl = require("./limitControl");
const core = require("../core");
const getIpArray = require("../utils/ip");

let server = null;
let heartbeatInterval = null;

/**
 * @param {LightningWebsocketConfig} config
 * @param wsPort
 * @returns {*}
 */
function initWebsocket(config, wsPort) {
  if (!config) {
    return console.error("config.websocket is undefined");
  }
  if (server !== null) {
    console.warn("ws server has been started, don't init again");
  } else {
    console.log("[Lightning] initWebsocket");
    const ws = require("nodejs-websocket"); // 懒加载
    server = ws.createServer(conn => {
      console.log("ws key", conn.key);
      if (config.wsLimit) {
        limitControl(server, config.wsLimit);
      }
      conn.isAlive = true;
      config.onConnected(conn);
      conn.on("pong", () => {
        conn.isAlive = true;
      });
      conn.on("text", str => {
        config.onText(str, conn);
      });
      conn.on("close", (code, reason) => {
        config.onClose(code, reason, conn);
      });
      conn.on("error", (code, reason) => {
        config.onError(code, reason, conn);
      });
    });

    server.listen(wsPort, () => {
      console.log("[Lightning] websocket server has been started successfully on port " + wsPort);
    });

    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
    }
    /**
     * 心跳监控
     */
    heartbeatInterval = setInterval(() => {
      server.connections.forEach(conn => {
        if (conn.isAlive === false) {
          console.log("heartbeat check failed:" + conn.key);
          conn.close();
        }
        conn.isAlive = false;
        conn.sendPing();
      });
    }, config.heartbeatTimeout);
  }
}

module.exports.start = function(wsPort, callback) {
  const config = core.getState().config;
  initWebsocket(config.websocket, wsPort);
  const ipArray = getIpArray();
  if (typeof callback === "function") {
    callback(ipArray);
  } else {
    ipArray.forEach(ip => console.log(`Lightning Websocket Server listening on ws://${ip}:${wsPort}!`));
  }
};

module.exports.getState = function() {
  return { server };
};
