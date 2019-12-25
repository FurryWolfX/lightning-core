import {Request, Response, NextFunction} from "express";

const responseTime = (callback: (method: string, url: string, duration: number) => void) => {
  if (typeof callback === "function") {
    return function(req: Request, res: Response, next: NextFunction) {
      const start = new Date().getTime();
      res.on("finish", function() {
        const end = new Date().getTime();
        const duration = end - start;
        callback(req.method, req.url, duration);
      });
      next();
    };
  } else {
    console.error("express-response-time request a callback function");
  }
};

export default responseTime;
