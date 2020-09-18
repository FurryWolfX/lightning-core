import { KV, RouteCallbackFn } from "../http/Server";

export function parseDynamicRoute(routeMap: Map<string, RouteCallbackFn>, path: string) {
  for (const k of routeMap.keys()) {
    // 保存原参数名称
    const paramNameList: string[] = [];
    const regStr: string = k.replace(/:[a-zA-Z_]+/g, s => {
      paramNameList.push(s.replace(/:/g, ""));
      // 将restful中冒号开头的替换，便于正则匹配
      return "(.*)";
    });
    const result = new RegExp(regStr).exec(path);
    if (result) {
      const params: KV<any> = {};
      for (let i = 1; i < result.length; i++) {
        const value = result[i];
        const key = paramNameList[i - 1];
        params[key] = value;
      }
      return {
        params,
        fn: routeMap.get(k)
      };
    }
  }
  return null;
}
