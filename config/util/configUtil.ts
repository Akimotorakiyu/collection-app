/**
 * 配置类型描述
 */
export interface ConfigMap<T> {
  [props: string]: T;
}

/**
 * 根据环境获取出环境配置
 * @param params - 参数
 */
export function getConfig<T>(params: ConfigMap<T>) {
  const config = params[process.env.NODE_ENV as string];
  if (config) {
    console.info(
      `ENV ${process.env.NODE_ENV}`,
      JSON.stringify(params[process.env.NODE_ENV as string], undefined, 4)
    );
    return params[process.env.NODE_ENV as string];
  } else {
    throw "没有匹配到配置！";
  }
}

export function setConfig<T>(params: ConfigMap<T>, config: T) {
  Object.assign(config, getConfig(params));
}
