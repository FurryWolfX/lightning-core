require("babel-register")({
  presets: ["env", "flow"],
  plugins: ["syntax-async-functions", "transform-regenerator", "babel-polyfill"]
});
const core = require("./core/core");
module.exports = {
  core
};
