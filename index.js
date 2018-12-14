require("babel-register")({
  presets: ["env", "flow"],
  plugins: ["syntax-async-functions", "transform-regenerator", "babel-polyfill"],
  ignore: function(filename) {
    if (filename.indexOf("@wolfx/lightning") > -1 || filename.indexOf("node_modules") === -1) {
      return false;
    } else {
      return true;
    }
  }
});
const core = require("./core/core");
module.exports = {
  core
};
