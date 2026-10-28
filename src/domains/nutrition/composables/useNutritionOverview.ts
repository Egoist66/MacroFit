import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useNutritionStore } from '@/domains/nutrition/stores/nutrition.store'
import type {
  MacroSummary,
  TodayProgressItem,
} from '@/domains/nutrition/types/nutrition.types'

/**
 * Готовит данные главного экрана: сводку по калориям, строкам БЖУ,
 * прогресс за день и действия с приёмами пищи.
 */
export function useNutritionOverview() {
  const store = useNutritionStore()
  const isMealDialogOpen = ref(false)
  const isGoalDialogOpen = ref(false)

  const goal = computed(() => store.goal)
  const totals = computed(() => store.totals)
  const macroCalorieShares = computed(() => store.macroCalorieShares)

  /** Четыре самых свежих приёма пищи для главного экрана. */
  const recentMeals = computed(() => store.meals.slice(0, 4))

  /** Процент выполнения цели, ограниченный 100. */
  function getPercentage(value: number, target: number): number {
    if (!target) return 0
    return Math.min(Math.round((value / target) * 100), 100)
  }

  /** Строки прогресса по белкам, жирам и углеводам. */
  const macroRows = computed<MacroSummary[]>(() => [
    {
      label: 'Белки',
      value: store.totals.protein,
      target: store.goal.protein,
      color: '#3b82f6',
      percentage: getPercentage(store.totals.protein, store.goal.protein),
    },
    {
      label: 'Жиры',
      value: store.totals.fat,
      target: store.goal.fat,
      color: '#34d399',
      percentage: getPercentage(store.totals.fat, store.goal.fat),
    },
    {
      label: 'Углеводы',
      value: store.totals.carbs,
      target: store.goal.carbs,
      color: '#fb7185',
      percentage: getPercentage(store.totals.carbs, store.goal.carbs),
    },
  ])

  /** Строки мини-статистики для карточки «Сегодня». */
  const todayRows = computed<TodayProgressItem[]>(() => [
    {
      label: 'Калории',
      value: store.totals.kcal,
      target: store.goal.kcal,
      unit: 'ккал',
      color: '#22c55e',
      icon: 'flame',
      percentage: getPercentage(store.totals.kcal, store.goal.kcal),
    },
    {
      label: 'Белки',
      value: store.totals.protein,
      target: store.goal.protein,
      unit: 'г',
      color: '#3b82f6',
      icon: 'dot',
      percentage: getPercentage(store.totals.protein, store.goal.protein),
    },
    {
      label: 'Жиры',
      value: store.totals.fat,
      target: store.goal.fat,
      unit: 'г',
      color: '#fbbf24',
      icon: 'dot',
      percentage: getPercentage(store.totals.fat, store.goal.fat),
    },
    {
      label: 'Углеводы',
      value: store.totals.carbs,
      target: store.goal.carbs,
      unit: 'г',
      color: '#fb7185',
      icon: 'dot',
      percentage: getPercentage(store.totals.carbs, store.goal.carbs),
    },
  ])

  /** Удаляет приём пищи и показывает пользователю подтверждение. */
  async function removeMeal(id: number): Promise<void> {
    await store.removeMeal(id)
    ElMessage.success('Приём пищи удалён')
  }

  return {
    isMealDialogOpen,
    isGoalDialogOpen,
    recentMeals,
    goal,
    totals,
    macroCalorieShares,
    macroRows,
    todayRows,
    removeMeal,
  }
}
