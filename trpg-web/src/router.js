import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/trpg',
      name: 'trpg',
      component: () => import('./views/Trpg.vue'),
      children:[
        {
          path: "login",
          component: () => import('./components/Login.vue')
        },{
          path: 'test',
          component: () => import('./views/Test.vue')
        },{
          path: 'createCh',
          name: 'createCh',
          component: () => import('./views/CreateCh.vue'),
          children:[
            {
              path:'ChBase',
              component: () => import('./components/ChBase.vue')
            },
            {
              path:'ChSkill',
              component: () => import('./components/ChSkill.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
