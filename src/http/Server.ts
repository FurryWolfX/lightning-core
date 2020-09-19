import * as http from "http";
import * as path from "path";
import * as fs from "fs";
import * as querystring from "querystring";
import * as urlLib from "url";
import { IncomingMessage, ServerResponse } from "http";
import { IncomingForm } from "formidable";
import getIpArray from "../utils/ip";
import { parseDynamicRoute } from "../utils/routeUtils";
import mime from "../file/mime";
import { handleStaticFile } from "../file/static";

export interface ServerConfig {
  port: number;
  staticDir?: string;
}

export type KV<T> = { [k: string]: T };

export interface RouteCallbackParams {
  fields: KV<any>; // 用于 post
  files: KV<any>; // 用于文件上传
  query: KV<any>; // 用于 qs
  params: KV<any>; // 用于动态路由参数
}

export interface RouteCallbackCtx {
  req: IncomingMessage;
  res: ServerResponse;
}

export type RouteCallbackFn = (data: RouteCallbackParams, ctx: RouteCallbackCtx) => Promise<string | Object>;

export interface Logger {
  log: Function;
  warn: Function;
  error: Function;
}

export default class Server {
  private instance: http.Server;
  private routeMap: Map<string, RouteCallbackFn> = new Map();
  public readonly config: ServerConfig;
  public responseHeaders: KV<string>;
  public logger: Logger = {
    log: console.log,
    warn: console.warn,
    error: console.error
  };
  public static readonly GET = "GET";
  public static readonly POST = "POST";

  constructor(config: ServerConfig) {
    this.config = config;
  }

  addRoute(method: string, path: string, callback: RouteCallbackFn) {
    this.routeMap.set(`${method}@${path}`, callback);
  }

  /**
   * 自定义responseHeaders
   * @param responseHeaders
   */
  setResponseHeaders(responseHeaders: KV<string>) {
    this.responseHeaders = responseHeaders;
  }

  /**
   * 自定义logger
   * @param logger
   */
  setLogger(logger: Logger) {
    this.logger = logger;
  }

  start() {
    if (this.instance) {
      console.error("server already started");
    } else {
      this.instance = http.createServer((req, res) => {
        // CORS Header
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type,Content-Length,Origin,Accept,X-Requested-With,X-Powered-By"
        );
        res.setHeader("X-Powered-By", "Lightning Framework 5");
        // 设置用户自定义的Headers
        if (this.responseHeaders) {
          Object.keys(this.responseHeaders).forEach(k => {
            res.setHeader(k, this.responseHeaders[k]);
          });
        }

        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          const { pathname, query: qs } = urlLib.parse(req.url);
          const query = querystring.parse(qs);

          this.logger.log("pathname: " + pathname);

          // 寻找路由定义
          const route = parseDynamicRoute(this.routeMap, `${req.method}@${pathname}`);
          if (route) {
            this.logger.log("route: " + JSON.stringify(route));
            this.logger.log("fields: " + JSON.stringify(fields));
            this.logger.log("files: " + JSON.stringify(files));
            this.logger.log("query: " + JSON.stringify(query));
            this.logger.log("params: " + JSON.stringify(route.params));
            const routeCallback = route.fn;
            if (typeof routeCallback === "function") {
              try {
                const result = await routeCallback({ fields, files, query, params: route.params }, { req, res });
                if (typeof result === "string") {
                  res.end(result);
                } else {
                  res.end(JSON.stringify(result));
                }
              } catch (e) {
                res.statusCode = 500;
                res.end(`${req.method} ${req.url}\n${e.stack}`);
              }
            }
          } else {
            // 查找静态资源
            if (this.config.staticDir) {
              // 把路径转换为系统的绝对路径
              const realpath = path.join(this.config.staticDir, pathname);
              this.logger.log("realpath: " + realpath);
              // 获取请求资源文件的后缀 用于编码格式
              const extname = path.extname(pathname).substring(1);
              handleStaticFile(req, res, realpath, extname);
            } else {
              res.statusCode = 404;
              res.end(`${req.method} ${req.url}\n404 NOT FOUND`);
            }
          }
        });
      });
      this.instance.listen(this.config.port);
      const ipArray = getIpArray();
      ipArray.forEach(ip => console.log(`Lightning Server listening on http://${ip}:${this.config.port}`));
    }
  }
  getInstance() {
    return this.instance;
  }
}
