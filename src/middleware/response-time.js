const responseTime = callback => {
  if (typeof callback === "function") {
    return function(req, res, next) {
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

module.exports = responseTime;
