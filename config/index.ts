import { getConfig, setConfig, ConfigMap } from "./util/configUtil";
import { app } from "electron";
import * as path from "path";
/**
 * 请求返回类型基础结构
 */
export type Result<T> = T;

/**
 * 配置类型描述
 */
interface Config {
  status: {
    mode: string;
    basePath: string;
  };
}

/**
 * 获取配置
 */
const config = getConfig<Config>({
  production: {
    status: {
      mode: "production",
      basePath: app.getAppPath()
    }
  },
  development: {
    status: {
      mode: "development",
      basePath: path.join(app.getAppPath(), "..")
    }
  }
});
console.log("config", config);

/**
 * 修改配置
 * @param params - 配置
 */
export function changeConfig(params: ConfigMap<Config>) {
  setConfig(params, config);
}

export default config;
