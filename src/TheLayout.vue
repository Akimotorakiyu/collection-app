<style lang="stylus" scoped>
.the-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .the-container {
    flex: 1;
    overflow: auto;
  }
}
</style>
<template>
  <section class="the-layout">
    <Drager></Drager>
    <router-view class="the-container"></router-view>
  </section>
</template>

<script>
export default {
  name: "TheLayout",
  components: {}
};
</script>
