import express from "express";
import bodyParser from "body-parser";
import cors from "express-cors";
import multer from "multer";
import NodeBatis from "nodebatis";
import path from "path";

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
    cb(null, "../public/upload");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage: storage
});

const database = new NodeBatis(path.resolve(__dirname, "../yaml"), {
  debug: true,
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
  database: "test",
  user: "root",
  password: "haosql"
});

export { app, upload, database };
