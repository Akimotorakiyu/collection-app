import Vue from "vue";
import Titleba from "./Titlebar.vue";

// 暂时停用这个组件
// Vue.component("MonacoEditor", MonacoEditor);

// fortawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.component("FAIcon", FontAwesomeIcon);
Vue.component("FontAwesomeIcon", FontAwesomeIcon);
Vue.component("Titleba", Titleba);

import { library } from "@fortawesome/fontawesome-svg-core";

import {} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

library.add();
