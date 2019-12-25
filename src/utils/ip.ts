import * as os from "os";

function getIpArray(): string[] {
  const ipConfig = os.networkInterfaces();
  const ipArray: string[] = [];
  Object.keys(ipConfig).forEach(key => {
    ipConfig[key].forEach(obj => {
      if (obj.internal === false && obj.family === "IPv4") {
        ipArray.push(obj.address);
      }
    });
  });
  return ipArray;
}

export default getIpArray;
