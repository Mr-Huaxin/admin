<template>
  <div class="navbar">
    <el-breadcrumb separator="">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
        {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched

      console.log('levelList: ', this.levelList);
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 45px;
  background-color: #f1f1f1;
  padding: 0;
}
.el-breadcrumb {
  line-height: 50px;
}
</style>
