const Lightning = require("../index");
const database = Lightning.core.getState().database;

let findByAge = async () => {
  let result = await database.query("test.findByAge", {
    age: 18
  });
  console.log(result);
  return result;
};

module.exports = { findByAge };
