import { createMemoryHistory, createRouter } from 'vue-router'

import LoginView from ''

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})