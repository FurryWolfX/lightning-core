import limitControl from "./limitControl";
import * as core from "../core";
import getIpArray from "../utils/ip";
import { Ws, Server, Connection } from "../../types/nodejs-websocket";
import { LightningWebsocketConfig } from "../type";

let server: Server = null;
let heartbeatInterval: NodeJS.Timeout = null;

function initWebsocket(config: LightningWebsocketConfig, wsPort: number, callback: () => void) {
  if (!config) {
    return console.error("config.websocket is undefined");
  }
  if (server !== null) {
    console.warn("ws server has been started, don't init again");
  } else {
    const ws: Ws = require("nodejs-websocket"); // 懒加载
    server = ws.createServer((conn: Connection) => {
      console.log("ws key", conn.key);
      if (config.wsLimit) {
        limitControl(server, config.wsLimit);
      }
      conn.isAlive = true;
      config.onConnected(conn);
      conn.on("pong", () => {
        conn.isAlive = true;
      });
      conn.on("text", (str: string) => {
        config.onText(str, conn);
      });
      conn.on("close", (code: number, reason: string) => {
        config.onClose(code, reason, conn);
      });
      conn.on("error", (code: number, reason: string) => {
        config.onError(code, reason, conn);
      });
    });

    server.listen(wsPort, () => callback());

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

export function start(wsPort: number, callback: (ipArray: Array<string>) => void) {
  const config = core.getState().config;
  initWebsocket(config.websocket, wsPort, () => {
    const ipArray = getIpArray();
    if (typeof callback === "function") {
      callback(ipArray);
    } else {
      ipArray.forEach(ip => console.log(`[Lightning] Lightning Websocket Server listening on ws://${ip}:${wsPort}!`));
    }
  });
}

export function getState() {
  return { server };
}
