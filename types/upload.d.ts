import * as multer from "multer";
declare type UploadConfig = {
    storage: string;
};
declare function getUpload(config: UploadConfig): multer.Instance;
export default getUpload;
