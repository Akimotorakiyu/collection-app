<template>
  <el-menu
    mode="horizontal"
    :router="true"
    :default-active="currentTopNav.name"
    v-show="routes.length >= 2"
  >
    <template v-for="item in routes">
      <el-menu-item :index="item.name" :route="item" :key="item.name">
        <i :class="item.meta && item.meta.icon ? item.meta.icon : ''"></i>
        {{ item.meta.nickName }}
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts">
import Vue from "vue";
import { RouteConfig } from "vue-router";
import { nav } from "../router/index";
export default Vue.extend({
  name: "TopNav",
  data() {
    return {
      routes: nav
    };
  },
  computed: {
    currentTopNav(): any {
      this.$route; //不可移除 @author 昝磊
      const route = this.routes.find(ele => {
        return this.$router.currentRoute.matched.some(
          item => ele.name === item.name
        );
      });
      const currentTopNav = route as RouteConfig;
      return currentTopNav;
    }
  }
});
</script>
