import { parseDynamicRoute } from "./routeUtils";

const m = new Map();
m.set("/a/:b/:c/:dsad", "");
const result = parseDynamicRoute(m, "/a/1/2/3");
console.log(result);
