<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain"
}
</script>

<style scoped>
  .app-main {
    width: 100%;
    height: calc(100vh - 45px);
  }
</style>
