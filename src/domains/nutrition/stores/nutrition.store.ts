import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { NUTRITION_STORE_ID } from '@/domains/nutrition/constants/nutrition.constants'
import { MEAL_EMOJIS, MEAL_TINTS, nutritionSeed } from '@/domains/nutrition/data/nutrition.data'
import type {
  Goal,
  MacroCalorieShares,
  Meal,
  NewMeal,
  NutritionTotals,
} from '@/domains/nutrition/types/nutrition.types'
import {
  calculateMacroCalorieShares,
  calculatePortionNutrition,
  normalizeNutritionPer100g,
  roundNutritionValue,
} from '@/domains/nutrition/utils/nutrition-calculations'

/**
 * Стор предметной области «Питание».
 * Хранит дневник приёмов пищи и цель, считает итоги.
 *
 * Сохранение в localStorage полностью берёт на себя глобальный
 * Pinia-плагин `createPiniaPersistencePlugin`: достаточно опции `persist`.
 */
export const useNutritionStore = defineStore(
  NUTRITION_STORE_ID,
  () => {
    const meals = ref<Meal[]>(
      nutritionSeed.meals.map((meal) => ({
        ...meal,
        per100g: { ...meal.per100g },
      })),
    )
    const goal = ref<Goal>({ ...nutritionSeed.goal })

    /**
     * Суммарные калории и БЖУ за день.
     * Для каждой записи ценность на 100 г пересчитывается на её вес.
     */
    const totals = computed<NutritionTotals>(() => {
      const summary = meals.value.reduce<NutritionTotals>((result, meal) => {
        const portion = calculatePortionNutrition(meal.per100g, meal.weight)

        return {
          kcal: result.kcal + portion.kcal,
          protein: result.protein + portion.protein,
          fat: result.fat + portion.fat,
          carbs: result.carbs + portion.carbs,
        }
      }, { kcal: 0, protein: 0, fat: 0, carbs: 0 })

      return {
        kcal: roundNutritionValue(summary.kcal),
        protein: roundNutritionValue(summary.protein),
        fat: roundNutritionValue(summary.fat),
        carbs: roundNutritionValue(summary.carbs),
      }
    })

    /** Доли калорий из белков, жиров и углеводов. */
    const macroCalorieShares = computed<MacroCalorieShares>(() =>
      calculateMacroCalorieShares(totals.value),
    )

    /** Есть ли в дневнике хотя бы один приём пищи. */
    const hasMeals = computed(() => meals.value.length > 0)

    /** Следующий свободный идентификатор приёма пищи. */
    function createMealId(): number {
      return meals.value.reduce((maxId, meal) => Math.max(maxId, meal.id), 0) + 1
    }

    /** Добавляет приём пищи. Состояние автоматически сохранит плагин. */
    async function addMeal(newMeal: NewMeal): Promise<void> {
      const id = createMealId()

      meals.value.unshift({
        ...newMeal,
        id,
        per100g: normalizeNutritionPer100g(newMeal.per100g),
        emoji: newMeal.emoji || MEAL_EMOJIS[id % MEAL_EMOJIS.length],
        tint: MEAL_TINTS[id % MEAL_TINTS.length],
      })
    }

    /** Удаляет приём пищи по идентификатору. */
    async function removeMeal(id: number): Promise<void> {
      meals.value = meals.value.filter((meal) => meal.id !== id)
    }

    /** Обновляет цель питания. */
    async function updateGoal(nextGoal: Goal): Promise<void> {
      goal.value = { ...nextGoal }
    }

    return {
      meals,
      goal,
      totals,
      macroCalorieShares,
      hasMeals,
      addMeal,
      removeMeal,
      updateGoal,
    }
  },
  {
    persist: true,
  },
)
