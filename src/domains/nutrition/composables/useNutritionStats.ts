import { computed } from 'vue'
import { useNutritionStore } from '@/domains/nutrition/stores/nutrition.store'
import type {
  MacroCard,
  StatsMetric,
  WeekDay,
} from '@/domains/nutrition/types/nutrition.types'

const WEEK_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

/**
 * Готовит данные страницы статистики.
 * История по дням пока не хранится, поэтому график показывает
 * только фактическое потребление за текущий день, без демо-значений.
 */
export function useNutritionStats() {
  const store = useNutritionStore()

  /** Процент выполнения цели, ограниченный 100. */
  function getPercentage(value: number, target: number): number {
    if (!target) return 0
    return Math.min(Math.round((value / target) * 100), 100)
  }

  /** Индекс текущего дня недели, где понедельник — 0. */
  function getTodayIndex(): number {
    return (new Date().getDay() + 6) % 7
  }

  /** Калории по дням недели: реальные данные есть только за сегодня. */
  const weekValues = computed<number[]>(() => {
    const todayIndex = getTodayIndex()
    return WEEK_LABELS.map((_, index) =>
      index === todayIndex ? store.totals.kcal : 0,
    )
  })

  /** Максимальное значение шкалы графика. */
  const maxChartValue = computed(() =>
    Math.max(store.goal.kcal, ...weekValues.value, 1),
  )

  /** Столбцы недельного графика с готовой высотой. */
  const weekDays = computed<WeekDay[]>(() =>
    weekValues.value.map((value, index) => ({
      day: WEEK_LABELS[index],
      value,
      height:
        value > 0
          ? `${Math.max(Math.round((value / maxChartValue.value) * 100), 4)}%`
          : '0%',
      isOverGoal: value > store.goal.kcal,
    })),
  )

  /** Дни, за которые есть записи о питании. */
  const recordedValues = computed(() =>
    weekValues.value.filter((value) => value > 0),
  )

  /** Средняя калорийность по дням с записями. */
  const averageCalories = computed(() => {
    if (!recordedValues.value.length) return 0

    const sum = recordedValues.value.reduce((total, value) => total + value, 0)
    return Math.round(sum / recordedValues.value.length)
  })

  /** Количество дней с записями, уложившихся в суточную норму. */
  const daysInGoal = computed(
    () =>
      recordedValues.value.filter((value) => value <= store.goal.kcal).length,
  )

  /** Краткие метрики для верхних карточек. */
  const metrics = computed<StatsMetric[]>(() => [
    {
      label: 'Среднее за неделю',
      value: averageCalories.value,
      unit: 'ккал',
      icon: 'flame',
      tone: 'amber',
    },
    {
      label: 'Дней в цели',
      value: daysInGoal.value,
      unit: `из ${recordedValues.value.length}`,
      icon: 'target',
      tone: 'green',
    },
    {
      label: 'Приёмов пищи',
      value: store.meals.length,
      unit: 'сегодня',
      icon: 'meal',
      tone: 'blue',
    },
  ])

  /** Текущий баланс макронутриентов относительно цели. */
  const macroBalance = computed<MacroCard[]>(() => [
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

  return {
    goal: computed(() => store.goal),
    weekDays,
    averageCalories,
    daysInGoal,
    metrics,
    macroBalance,
  }
}
