export declare type FileItem = {
    path?: string;
    filename?: string;
    url?: string;
};
declare function readFileList(path: string, filesList?: any[]): FileItem[];
export default readFileList;
