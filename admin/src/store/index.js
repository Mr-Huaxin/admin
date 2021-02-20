// import Vue from "vue";
// import Vuex from "vuex";
//
// Vue.use(Vuex);
// export default new Vuex.Store({
//   state: {
//     lon: "",
//     log: "",
//     token:localStorage.getItem("token")
//   },
//   getters: {
//     GET_Token: state => {
//       state.token = localStorage.getItem("token");
//       return state.token;
//     }
//   },
//   mutations: {
//     SET_LONLAT(state, lonlat) {
//       state.lon = lonlat;
//     },
//     SET_LOGLAT(state, lonlat) {
//       state.log = lonlat;
//     },
//     SET_Token(state, token) {
//       state.token = token;
//       localStorage.setItem("token", token);
//     },
//     REM_Token(state) {
//       state.token = undefined;
//       localStorage.removeItem("token");
//     }
//   },
//   actions: {}
// });
