import { app, upload } from "../core/core";
import { findByAge } from "../service/user";

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/test", async (req, res) => {
  res.send(await findByAge());
});

// single 文件上传
app.post("/upload", upload.single("file"), (req, res, next) => {
  // console.log("file:" + req.file.originalname);
  // console.log(res);
  // const url = "http://" + req.headers.host + "/upload/" + req.file.filename;
  res.end(req.file.filename);
});
