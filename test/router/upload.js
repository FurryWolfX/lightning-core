const { app, upload } = require("../..").core.getState();

// single 文件上传
app.post("/upload", upload.single("file"), (req, res, next) => {
  // console.log("file:" + req.file.originalname);
  // console.log(res);
  // const url = "http://" + req.headers.host + "/upload/" + req.file.filename;
  res.end(req.file.filename);
});
