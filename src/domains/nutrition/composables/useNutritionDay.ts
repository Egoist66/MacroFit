import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useNutritionStore } from '@/domains/nutrition/stores/nutrition.store'
import type { MacroCard } from '@/domains/nutrition/types/nutrition.types'

/**
 * Готовит данные страницы «Питание»: выбранную дату, карточки БЖУ,
 * список приёмов пищи и действия с ними.
 */
export function useNutritionDay() {
  const store = useNutritionStore()
  const isMealDialogOpen = ref(false)

  const meals = computed(() => store.meals)
  const totals = computed(() => store.totals)
  const goal = computed(() => store.goal)
  const mealsCount = computed(() => store.meals.length)

  /** Процент выполнения цели, ограниченный 100. */
  function getPercentage(value: number, target: number): number {
    if (!target) return 0
    return Math.min(Math.round((value / target) * 100), 100)
  }

  /** Карточки макронутриентов с текущим значением и процентом цели. */
  const macroCards = computed<MacroCard[]>(() => [
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
      color: '#fbbf24',
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

  /** Удаляет приём пищи и показывает пользователю подтверждение. */
  async function removeMeal(id: number): Promise<void> {
    await store.removeMeal(id)
    ElMessage.success('Приём пищи удалён')
  }

  return {
    isMealDialogOpen,
    meals,
    totals,
    goal,
    mealsCount,
    macroCards,
    removeMeal,
  }
}
