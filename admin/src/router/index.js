import Vue from 'vue';
import Router from 'vue-router';
// import Login from '@/page/login'
import Layout from '../layout/index';

Vue.use(Router);
// 默认不需要权限的页面
export const constantRouter = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/page/login/index'),
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/page/home/index'),
        meta: { title: '首页', icon: 'homepage' }
      },
      {
        path: 'page1',
        name: '页面1',
        component: () => import('@/page/page1/index'),
        meta: { title: '页面1'}
      },{
        path: 'page2',
        name: '页面2',
        component: () => import('@/page/page2/index'),
        meta: { title: '页面2'}
      },
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history',
  routes: constantRouter
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
//
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");
//   if (token !== null) {
//     next();
//   } else if (to.path !== "/login") {
//     if (token === null || token === "") {
//       next({
//         path: "/"
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router
