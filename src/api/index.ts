import myAxios, { setAuthorization } from "./util/myAxios";
import { changeConfig, config } from "./config";
import * as api from "./api";

/**
 * 导出接口
 */
export default {
  changeConfig,
  config,
  api,
  myAxios,
  setAuthorization
};
