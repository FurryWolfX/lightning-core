const os = require("os");

/**
 * @returns {Array}
 */
const getIpArray = () => {
  const ipConfig = os.networkInterfaces();
  const ipArray = [];
  Object.keys(ipConfig).forEach(key => {
    ipConfig[key].forEach(obj => {
      if (obj.internal === false && obj.family === "IPv4") {
        ipArray.push(obj.address);
      }
    });
  });
  return ipArray;
};

module.exports = getIpArray;
