import type {
  MacroCalorieShares,
  NutritionPer100g,
  NutritionTotals,
  PortionNutrition,
} from '@/domains/nutrition/types/nutrition.types'

/** Энергетические коэффициенты Аткуотера, ккал на грамм. */
export const ENERGY_PER_GRAM = {
  protein: 4,
  fat: 9,
  carbs: 4,
} as const

/** Округляет пищевую ценность до одного знака после запятой. */
export function roundNutritionValue(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.round((value + Number.EPSILON) * 10) / 10
}

/** Пересчитывает значение «на 100 г» на фактический вес порции. */
export function scalePer100g(valuePer100g: number, weight: number): number {
  return (valuePer100g * weight) / 100
}

/**
 * Считает калорийность на 100 г по БЖУ, если производитель её не указал.
 * Формула: 4 × белки + 9 × жиры + 4 × углеводы.
 */
export function calculateKcalPer100gFromMacros(
  per100g: Pick<NutritionPer100g, 'protein' | 'fat' | 'carbs'>,
): number {
  return (
    per100g.protein * ENERGY_PER_GRAM.protein +
    per100g.fat * ENERGY_PER_GRAM.fat +
    per100g.carbs * ENERGY_PER_GRAM.carbs
  )
}

/**
 * Возвращает калорийность на 100 г.
 * Приоритет всегда у значения производителя — оно точнее расчёта по БЖУ.
 */
export function resolveKcalPer100g(per100g: NutritionPer100g): number {
  if (per100g.kcal > 0) return per100g.kcal
  return calculateKcalPer100gFromMacros(per100g)
}

/** Нормализует и округляет пищевую ценность на 100 г. */
export function normalizeNutritionPer100g(
  per100g: NutritionPer100g,
): NutritionPer100g {
  return {
    kcal: roundNutritionValue(resolveKcalPer100g(per100g)),
    protein: roundNutritionValue(per100g.protein),
    fat: roundNutritionValue(per100g.fat),
    carbs: roundNutritionValue(per100g.carbs),
  }
}

/** Пересчитывает пищевую ценность на 100 г на фактический вес порции. */
export function calculatePortionNutrition(
  per100g: NutritionPer100g,
  weight: number,
): PortionNutrition {
  return {
    kcal: roundNutritionValue(scalePer100g(resolveKcalPer100g(per100g), weight)),
    protein: roundNutritionValue(scalePer100g(per100g.protein, weight)),
    fat: roundNutritionValue(scalePer100g(per100g.fat, weight)),
    carbs: roundNutritionValue(scalePer100g(per100g.carbs, weight)),
  }
}

/**
 * Считает долю калорий из каждого макронутриента.
 * Сумма может немного отличаться от 100% из-за воды, клетчатки
 * и округлений — это нормально.
 */
export function calculateMacroCalorieShares(
  totals: NutritionTotals,
): MacroCalorieShares {
  if (!totals.kcal) {
    return { protein: 0, fat: 0, carbs: 0 }
  }

  return {
    protein: roundNutritionValue(
      ((totals.protein * ENERGY_PER_GRAM.protein) / totals.kcal) * 100,
    ),
    fat: roundNutritionValue(
      ((totals.fat * ENERGY_PER_GRAM.fat) / totals.kcal) * 100,
    ),
    carbs: roundNutritionValue(
      ((totals.carbs * ENERGY_PER_GRAM.carbs) / totals.kcal) * 100,
    ),
  }
}
