import { database } from "../core/core";

let findByAge = async () => {
  let result = await database.execute("test.findByAge", {
    age: 18
  });
  console.log(result);
  return result;
};

export { findByAge }