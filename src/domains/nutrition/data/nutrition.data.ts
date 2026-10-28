import type { NutritionSnapshot } from '@/domains/nutrition/types/nutrition.types'

/** Стартовое состояние: пустой дневник и незаполненная цель. */
export const nutritionSeed: NutritionSnapshot = {
  meals: [],
  goal: {
    title: '',
    kcal: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  },
}

/** Палитра фонов для автоматически добавляемых приёмов пищи. */
export const MEAL_TINTS = ['#fdf3e3', '#fdeee0', '#fdf8dc', '#eef4ff', '#f0fdf4', '#fdf2f8', '#f5f3ff']

/** Набор эмодзи для автоматически добавляемых приёмов пищи. */
export const MEAL_EMOJIS = ['🥣', '🍗', '🍌', '🥛', '🥗', '🍳', '🥑', '🍎', '🐟', '🥜']
