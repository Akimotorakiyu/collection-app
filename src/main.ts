import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/components";
import "./main.styl";
Vue.config.productionTip = false;

import "@/plugins";

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import { AxiosError } from "axios";
import sdk from "@/api/index";

function errorhandle(error: AxiosError) {
  console.error(error);

  if (error.response) {
    const message =
      error.response.data.detail ||
      []
        .concat(error.response.data.msg)
        .map((ele, index) => `${index + 1}. ${ele};`)
        .join("\n");

    app.$notify({
      type: "error",
      title: "错误",
      message
    });
  }
  throw error;
}

sdk.myAxios.interceptors.response.use(undefined, errorhandle);
