import type { PageHeaderMeta } from '@/components/ui/page-header.types'

declare module 'vue-router' {
  interface RouteMeta {
    /** Заголовок страницы, который рендерит общий layout. */
    pageHeader?: PageHeaderMeta
    /** Показывать ли выбор даты в шапке страницы. */
    showDatePicker?: boolean
  }
}
