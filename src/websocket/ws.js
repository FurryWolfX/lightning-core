const limitControl = require("./limitControl");

let server = null;
let heartbeatInterval = null;

/**
 * @param {LightningWebsocketConfig} config
 * @returns {*}
 */
module.exports.initWebsocket = function(config) {
  if (!config) {
    return null;
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

    server.listen(config.wsPort, () => {
      console.log("[Lightning] websocket server has been started successfully on port " + config.wsPort);
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
  return server;
};
