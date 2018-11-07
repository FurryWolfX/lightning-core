import express from "express";
import bodyParser from "body-parser";
import cors from "express-cors";
import multer from "multer";
import NodeBatis from "@wolfx/nodebatis";
import path from "path";
import md5 from "./util/md5";

const app = express();

app.use(
  cors({
    allowedOrigins: ["*"]
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// 文件上传
// 参考：https://blog.csdn.net/jishoujiang/article/details/80367683
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/upload"));
  },
  filename: function(req, file, cb) {
    // cb(null, file.originalname);
    let ext = file.originalname.split(".");
    let extName = "";
    if (ext.length > 1) {
      extName = ext[ext.length - 1];
    }
    cb(null, md5(new Date().getTime() + "-" + file.originalname) + "." + extName);
  }
});
const upload = multer({
  storage: storage
});

const database = new NodeBatis(path.resolve(__dirname, "../yaml"), {
  debug: true,
  dialect: "mysql",
  host: "192.168.1.22",
  port: 3306,
  database: "test",
  user: "root",
  password: "junlian"
});

export { app, upload, database };
