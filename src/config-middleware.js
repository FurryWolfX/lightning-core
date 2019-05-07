const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("express-cors");
const responseTime = require("./middleware/response-time");

function apply(app, config) {
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

module.exports = apply;
