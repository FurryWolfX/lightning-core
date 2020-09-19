import * as fs from "fs";
import * as path from "path";
import mime from "./mime";
import { IncomingMessage, ServerResponse } from "http";

export function handleStaticFile(req: IncomingMessage, res: ServerResponse, realpath: string, extname: string) {
  fs.readFile(realpath, (err, data) => {
    if (err) {
      if (/index.html$/.test(realpath)) {
        res.statusCode = 404;
        res.end(`${req.method} ${req.url}\n404 NOT FOUND`);
      } else {
        // 如果找不到资源，尝试使用 index.html
        handleStaticFile(req, res, path.join(realpath, "index.html"), "html");
      }
    } else {
      // 利用 mime模块 设置不同资源的文件的编码格式
      res.setHeader("Content-Type", mime[extname] + ";charset=utf-8");
      res.statusCode = 200;
      res.end(data);
    }
  });
}
