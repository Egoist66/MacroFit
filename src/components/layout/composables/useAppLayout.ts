import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { PageHeaderMeta } from '@/components/ui/page-header.types'

/**
 * Состояние общего каркаса приложения.
 * Заголовок страницы и видимость выбора даты берутся из meta маршрута,
 * поэтому view не содержат дублирующейся шапки.
 */
export function useAppLayout() {
  const route = useRoute()
  const selectedDate = ref(new Date())

  /** Заголовок текущей страницы из метаданных маршрута. */
  const pageHeader = computed<PageHeaderMeta | undefined>(() => route.meta.pageHeader)

  /** Показывать ли выбор даты в шапке текущей страницы. */
  const isDatePickerVisible = computed(() => route.meta.showDatePicker === true)

  return {
    pageHeader,
    isDatePickerVisible,
    selectedDate,
  }
}
