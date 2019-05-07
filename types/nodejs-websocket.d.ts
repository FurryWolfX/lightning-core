export interface Server {
  listen(port: number, host?: string, callback?: Function): void;
  close(callback?: Function): void;
  socket: any;
  connections: Array<Connection>;
}

export interface Connection {
  sendText(str: string, callback?: Function): void;
  beginBinary(): void;
  sendBinary(str: any, callback?: Function): void;
  send(data: string | Buffer, callback?: Function): void;
  sendPing(data?: string): void;
  close(code?: string | number, reason?: string): void;
  socket: any;
  server: any;
  readyState: any;
  outStream: any;
  path: string;
  headers: string;
  protocols: Array<string>;
  protocol: string;
  on: Function;
}

export interface Ws {
  createServer(options?: any, callback?: Function): Server;
  connect(URL: string, options?: any, callback?: Function): Connection;
  setBinaryFragmentation(bytes: any): any;
  setMaxBufferLength(bytes: any): any;
}
