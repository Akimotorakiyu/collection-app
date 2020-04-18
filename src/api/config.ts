import { getConfig, setConfig, ConfigMap } from "./util/configUtil";
import myAxios from "./util/myAxios";
/**
 * 请求返回类型基础结构
 */

export type Result<T> = T;

/**
 * 配置类型描述
 */
interface Config {
  baseUrl: string;
  desc: string;
}

/**
 * 获取配置
 */
export const config = getConfig<Config>({
  production: {
    desc: "production",
    baseUrl: "http://127.0.0.1:8000"
  },
  development: {
    desc: "development",
    baseUrl: "http://127.0.0.1:8000"
  },
  test: {
    desc: "development",
    baseUrl: "http://127.0.0.1:8000"
  }
});

/**
 * 修改配置
 * @param params - 配置
 */
export function changeConfig(params: ConfigMap<Config>) {
  setConfig(params, config);
}

/**
 * 制作 post 请求函数
 * @param path 路径
 */
export function makePostFun<Req = any, Res = any>(path: string) {
  return function(data: Req) {
    return myAxios.post<Result<Res>>(`${config.baseUrl}${path}`, data);
  };
}

/**
 * 制作 get 请求函数
 * @param path 路径
 */
export function makeGetFun<Req = any, Res = any>(path: string) {
  return function(params: Req) {
    return myAxios.get<Result<Res>>(`${config.baseUrl}${path}`, { params });
  };
}
