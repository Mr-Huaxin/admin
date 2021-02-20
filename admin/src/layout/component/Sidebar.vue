<template>
  <div class="left-side-container">
    <div class="logo">{{ projectName }}</div>
    <div class="menu-wrap">
      <el-menu
        :default-active="this.$route.path"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b">

        <template v-for="(item, index) in menuList">
          <el-menu-item v-if="!item.children" :key="index" :index="item.path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <el-submenu :key="index" :index="item.path" v-if="item.children">
            <template slot="title">{{ item.name }}</template>
            <el-menu-item :index="child.path" :key="child.path" v-for="(child, index) in item.children">
              {{ child.name}}
            </el-menu-item>
          </el-submenu>
        </template>

      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SideBar',
  components: {

  },
  data() {
    return {
      menuList: [
        {path:'/home',name:'首页'},
        {
          path:'/',name:'产品',
          children: [
            {path:'/page1',name:'产品1'},
            {path:'/page2',name:'产品2'},
          ]
        }
      ],
      projectName: 'XX后台管理系统',
    }
  },
  created() {

  },
  methods: {

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style>
.left-side-container {
  width: 100%;
  height: 100%;
  background-color: #304156;
}
.logo {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
}

.menu-wrap {
  width: 100%;
  height: calc(100vh - 45px);
}

.el-submenu .el-menu-item {
  min-width: inherit!important;
}

.el-menu {
  border-right: 0!important;
}
</style>
