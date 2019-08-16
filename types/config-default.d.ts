export declare type LightningCorsConfig = {
    allowedOrigins: Array<string>;
};
export declare type LightningWebsocketConfig = {
    wsLimit?: number;
    heartbeatTimeout: number;
    onConnected?: Function;
    onText?: Function;
    onClose?: Function;
    onError?: Function;
};
export declare type LightningConfig = {
    websocket?: LightningWebsocketConfig;
    cors: LightningCorsConfig;
    static: string;
    responseLogCallback?: (method: any, url: any, time: any) => void;
    requestLogCallback?: (method: any, url: any) => void;
    storage: string;
    routerDir: string;
};
declare const defaultConfig: LightningConfig;
export default defaultConfig;
