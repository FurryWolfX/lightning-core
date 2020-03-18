import * as multer from "multer";
import md5 from "./utils/md5";

type UploadConfig = {
  storage: string;
};

function getUpload(config: UploadConfig) {
  // 文件上传
  // 参考：https://blog.csdn.net/jishoujiang/article/details/80367683
  const storage: multer.StorageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, config.storage);
    },
    filename: function(req, file, cb) {
      let ext = file.originalname.split(".");
      let extName = "";
      if (ext.length > 1) {
        extName = ext[ext.length - 1];
      }
      cb(null, md5(new Date().getTime() + "-" + file.originalname) + "." + extName);
    }
  });
  return multer({
    storage: storage
  });
}

export default getUpload;
