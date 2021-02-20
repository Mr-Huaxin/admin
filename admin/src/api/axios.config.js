/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
// import store from '../store/index';
import { Message, Loading } from "element-ui";

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      Message({message:'登录过期，请重新登录',type: "error"});
      localStorage.removeItem('token');
      store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      Message({message:'请求的资源不存在',type: "error"});
      break;
    default:
      console.log(other);
  }}


// 创建axios实例
var instance = axios.create({
  baseURL: 'http://192.168.1.156:10012',//process.env.VUE_APP_BASE_API
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 12,
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      console.log("拦截了",response);
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            console.log('错误请求')
            break;
        }
      } else {
        Message({
          message: '服务器连接超时，请重试',
          type: 'error'
        })
      }
      return Promise.resolve(err.response)
    }
  });

export default instance;

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}

/*axios.post(url, qs.stringify(params))*/
export const post = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, (params)).then(res => {
        res && res.data ? resolve(res.data) : resolve(res)
      },
      err => {
        reject(err)
      })
  })
}
export function deleteFn(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url,  {params:params}).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}

