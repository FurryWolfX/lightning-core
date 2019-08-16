import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "express-cors";
import responseTime from "./middleware/response-time";
import { Application } from "express";
import { LightningConfig } from "./type";

function apply(app: Application, config: LightningConfig) {
  app.use(cors(config.cors));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(config.static));
  app.use(
    responseTime((method, url, time) => {
      if (typeof config.responseLogCallback === "function") {
        config.responseLogCallback(method, url, time);
      } else {
        console.log(`[S] ${method} ${url} ${time}ms`);
      }
    })
  );

  app.all("*", (req, res, next) => {
    if (typeof config.requestLogCallback === "function") {
      config.requestLogCallback(req.method, req.url);
    } else {
      console.log(`[R] ${req.method} ${req.url}`);
    }
    next();
  });
}

export default apply;
