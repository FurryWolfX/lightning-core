import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as compression from "compression";
import responseTime from "./middleware/response-time";
import { Application } from "express";
import { LightningConfig } from "./type";

function apply(app: Application, config: LightningConfig) {
  if (config.cors) {
    app.use(cors());
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(config.static));
  app.use(compression());
  app.use(
    responseTime((method, url, time) => {
      if (url === "/is-service-online") return;
      if (typeof config.responseLogCallback === "function") {
        config.responseLogCallback(method, url, time);
      } else {
        console.log(`[S] ${method} ${url} ${time}ms`);
      }
    })
  );

  app.get("/is-service-online", (req, res, next) => {
    res.send({ online: true });
  });

  app.all("*", (req, res, next) => {
    res.header("X-Powered-By", "Lightning Framework");
    if (typeof config.requestLogCallback === "function") {
      config.requestLogCallback(req.method, req.url);
    } else {
      console.log(`[R] ${req.method} ${req.url}`);
    }
    next();
  });
}

export default apply;
