import path from "path";
import fs from "fs";
import { app } from "./core";

// 读取路由文件
const routers = fs.readdirSync(path.resolve(__dirname, "../router"));
routers.forEach(p => require("../router/" + p));

app.listen(3000, () => console.log("Server listening on port 3000!"));
