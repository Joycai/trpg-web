import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/trpg",
      name: "trpg",
      component: () => import("./views/Trpg.vue"),
      children: [
        {
          path: "login",
          component: () => import(/* webpackChunkName: "login" */ "./components/Login.vue")
        },
        {
          path: "home",
          component: () => import(/* webpackChunkName: "home" */ "./views/TrpgHome.vue")
        },
        {
          path: "test",
          component: () => import(/* webpackChunkName: "test" */ "./views/Test.vue")
        },
        {
          path: "createCh",
          name: "createCh",
          component: () => import(/* webpackChunkName: "createCh" */ "./views/CreateCh.vue")
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
