<style lang="stylus" scoped>
.the-app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .the-container {
    flex: 1;
    overflow: auto;
    padding: 15px;
    margin: 15px;
    border-radius: 0.4em;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
  }
}
</style>
<template>
  <section class="the-app-layout">
    <section>
      <TopNav></TopNav>
    </section>
    <section class="the-container">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import TopNav from "./TopNav.vue";

export default {
  name: "TheAppLayout",
  components: {
    TopNav
  }
};
</script>
