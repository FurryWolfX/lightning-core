import axios from "axios";
import { LightningConfig } from "./type";

export function doRegister(config: LightningConfig) {
  if (
    config.serviceCenter &&
    config.serviceCenter.centerUrl &&
    config.serviceCenter.serviceName &&
    config.serviceCenter.serviceUrl
  ) {
    console.log("init micro-service:" + config.serviceCenter.centerUrl);
    console.log("init micro-service:" + config.serviceCenter.serviceName);
    console.log("init micro-service:" + config.serviceCenter.serviceUrl);
    axios
      .post(config.serviceCenter.centerUrl, {
        name: config.serviceCenter.serviceName,
        url: config.serviceCenter.serviceUrl
      })
      .then(result => console.log("micro-service", result.data))
      .catch(e => console.error("micro-service", e.stack));
  }
}
