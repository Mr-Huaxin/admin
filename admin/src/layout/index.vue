<template>
  <div class="app-wrapper">
    <!--侧边栏-->
    <Sidebar class="sidebar-container"/>

    <!--主体部分-->
    <div class="main-container">
      <div class="">
        <Navbar />
      </div>
      <!--主内容-->
      <AppMain />
    </div>
  </div>
</template>

<script>
import Sidebar from './component/Sidebar'
import Navbar from "./component/Navbar";
import AppMain from "./component/AppMain";

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
.sidebar-container {
  width: 10%;
  height: 100vh;
  float: left;
}

.main-container {
  float: right;
  width: 90%;
}
</style>
