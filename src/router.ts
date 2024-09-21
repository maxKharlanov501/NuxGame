import { createWebHistory, createRouter } from 'vue-router'
import Cookies from 'js-cookie';

import LoginView from './views/login.vue'
import HomeView from './views/index.vue'
import MyProfileView from './views/my-profile.vue'

import MainLayout from './layouts/MainLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

const routes = [
  { 
    path: '/', 
    component: MainLayout,
    beforeEnter: (to, from, next) => {
      const user = Cookies.get('user')
      if (user) next()
      else next('/login')
    },
    children: [
      { path: '', component: HomeView },
      { path: '/about', component: MyProfileView }
    ]
  },
  { 
    path: '/login', 
    component: EmptyLayout,
    beforeEnter: (to, from, next) => {
      const user = Cookies.get('user')
      if (user) next('/')
      else next()
    },
    children: [
      { path: '', component: LoginView }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})