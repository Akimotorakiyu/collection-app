<style lang="stylus" scoped>
$iconWidth = 24px;

header {
  display: flex;
  line-height: 15px;
  justify-content: space-between;
  font-size: 16px;
  background-color: #181d23;
  color: white;
  font-weight: lighten;
  padding-top: 3px;

  .dragable {
    -webkit-app-region: drag;
    flex: 1;
  }

  .tool, .header {
    padding: 10px;
  }

  .header {
    .path {
      color: cadetblue;
    }
  }

  .tool {
    .window {
      color: cadetblue;
      width: $iconWidth;

      &:hover {
        color: chartreuse;
      }
    }
  }
}
</style>

<template>
  <header v-if="isElectron">
    <div class="dragable header">
      <!-- <FAIcon class="dragable" :icon="faAppStore"></FAIcon> -->
      <span class="title">{{ title }}</span>
    </div>
    <div class="dragable header">
      <span class="path">结算系统</span>
    </div>
    <div class="tool">
      <FAIcon
        class="window"
        :icon="faWindowMinimize"
        @click="deal('mini')"
      ></FAIcon>
      <FAIcon
        class="window"
        :icon="faFileCode"
        @click="deal('devtool')"
      ></FAIcon>
      <FAIcon class="window" :icon="faArrowLeft" @click="deal('back')"></FAIcon>
      <FAIcon
        class="window"
        :icon="faArrowRight"
        @click="deal('forward')"
      ></FAIcon>
      <FAIcon class="window" :icon="faPlus" @click="deal('new')"></FAIcon>
      <FAIcon
        class="window"
        :icon="maximizeState ? faWindowRestore : faWindowMaximize"
        @click="deal(maximizeState ? 'unmax' : 'max')"
      ></FAIcon>
      <FAIcon class="window" :icon="faRedo" @click="deal('reload')"></FAIcon>
      <FAIcon
        class="window"
        :icon="faWindowClose"
        @click="deal('close')"
      ></FAIcon>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

import {
  faRedo,
  faPlus,
  faArrowLeft,
  faArrowRight,
  faFileCode
} from "@fortawesome/free-solid-svg-icons";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowMinimize,
  faWindowRestore,
  faSnowflake
} from "@fortawesome/free-regular-svg-icons";

import { faWpexplorer, faAppStore } from "@fortawesome/free-brands-svg-icons";
export default Vue.extend({
  name: "Drager",
  data() {
    return {
      faAppStore,
      faFileCode,
      faWindowMinimize,
      faRedo,
      faPlus,
      faArrowLeft,
      faArrowRight,
      faWindowMaximize,
      faWindowRestore,
      faWindowClose,
      maximizeState: false
    };
  },
  methods: {
    async deal(command: string) {
      switch (command) {
        case "back":
          this.$router.back();
          break;
        case "forward":
          this.$router.forward();
          break;
        case "reload":
          window.location.reload();
          break;
        case "new":
          window.open(window.location.href);
          break;
        default:
          await window.electron?.ipcRenderer?.invoke(
            "windowShowControl",
            command
          );
          break;
      }

      switch (command) {
        case "max":
          this.maximizeState = true;
          break;
        case "unmax":
          this.maximizeState = false;
          break;
        default:
          break;
      }
    }
  },
  computed: {
    isElectron() {
      return window.electron ? true : false;
    },
    title() {
      let title =
        this.$route.meta?.nickName ??
        this.$route.meta?.name ??
        this.$route.meta?.title ??
        "";

      return title;
    },
    pathName() {
      this.$route;
      return window.location.pathname;
    }
  },
  mounted() {}
});
</script>
