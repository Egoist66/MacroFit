import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { Meal, PortionNutrition } from '@/domains/nutrition/types/nutrition.types'
import { calculatePortionNutrition } from '@/domains/nutrition/utils/nutrition-calculations'

/**
 * Считает пищевую ценность фактической порции приёма пищи.
 * Значения хранятся на 100 г, поэтому пересчёт всегда актуален.
 */
export function useMealPortion(meal: MaybeRefOrGetter<Meal>) {
  return computed<PortionNutrition>(() => {
    const currentMeal = toValue(meal)
    return calculatePortionNutrition(currentMeal.per100g, currentMeal.weight)
  })
}
