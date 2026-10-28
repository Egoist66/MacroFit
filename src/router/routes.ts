import type { RouteRecordRaw } from 'vue-router'
import './route-meta'

/**
 * Маршруты приложения. Каждая страница загружается лениво,
 * чтобы стартовый бандл оставался компактным.
 *
 * Заголовки страниц живут в meta и рендерятся общим AppLayout,
 * поэтому во view нет дублирующейся шапки.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      pageHeader: {
        title: 'Привет!',
        emoji: '👋',
        subtitle: 'Следи за своим питанием и достигай целей.',
      },
      showDatePicker: true,
    },
  },
  {
    path: '/nutrition',
    name: 'nutrition',
    component: () => import('@/views/NutritionView.vue'),
    meta: {
      pageHeader: {
        title: 'Питание',
        subtitle: 'Все приёмы пищи за выбранный день и их питательная ценность.',
      },
      showDatePicker: true,
    },
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/views/StatsView.vue'),
    meta: {
      pageHeader: {
        title: 'Статистика',
        subtitle: 'Динамика питания за последнюю неделю и баланс нутриентов.',
      },
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: {
      pageHeader: {
        title: 'Настройки',
        subtitle: 'Профиль, цель питания и уведомления — всё в одном месте.',
      },
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]
