require("babel-register")({
  presets: ["latest", "flow"],
  plugins: ["syntax-async-functions", "transform-regenerator", "babel-polyfill"]
});

module.exports = require("./core/server.js");
