const md5 = require("./md5");

/**
 * 从参数获取签名
 * @param params
 * @returns {*}
 */
function getSignatureFromParams(params) {
  let keys = Object.keys(params);
  let newParams = [];
  keys.sort();
  keys.forEach(k => newParams.push(k + "=" +params[k]));
  const newQueryString = newParams.join("&");
  console.log(newQueryString, md5(newQueryString));
  return md5(newQueryString);
}

// getSignatureFromParams({c:3,a:1,b:2});
module.exports = getSignatureFromParams;