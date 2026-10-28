import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

/**
 * Корневой роутер приложения с прокруткой страницы наверх
 * при каждом переходе.
 */
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
