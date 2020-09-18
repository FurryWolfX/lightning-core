import Server from "./http/Server";

export function routerClass() {
  return function(Target: any) {
    new Target();
  };
}

export function routerMapper(server: Server, method: string, path: string) {
  return function(target: any, methodName: any, desc: any) {
    // console.log(target);
    // console.log(methodName);
    // console.log(desc);
    server.addRoute(method, path, target[methodName]);
  };
}
