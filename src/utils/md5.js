const Buffer = require("buffer").Buffer;
const crypto = require("crypto");

function md5(data) {
  const buf = Buffer.from(data);
  const str = buf.toString("binary"); // 关键
  return crypto
    .createHash("md5")
    .update(str)
    .digest("hex");
}

module.exports = md5;
