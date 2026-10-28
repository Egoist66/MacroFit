import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useNutritionStore } from '@/domains/nutrition/stores/nutrition.store'
import type { MealFormValues } from '@/domains/nutrition/types/nutrition.types'
import {
  calculatePortionNutrition,
  normalizeNutritionPer100g,
  resolveKcalPer100g,
} from '@/domains/nutrition/utils/nutrition-calculations'

/** Возвращает пустые значения формы добавления приёма пищи. */
function createEmptyMealForm(): MealFormValues {
  return {
    name: '',
    weight: 100,
    per100g: {
      kcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    },
  }
}

/**
 * Управляет формой добавления приёма пищи.
 * Пользователь вводит ценность на 100 г, а порция пересчитывается
 * по фактическому весу. Если ккал не указана, она считается по БЖУ.
 */
export function useMealForm() {
  const store = useNutritionStore()
  const form = reactive<MealFormValues>(createEmptyMealForm())
  const isSubmitting = ref(false)

  /** Калорийность на 100 г с учётом расчёта по БЖУ. */
  const kcalPer100g = computed(() => resolveKcalPer100g(form.per100g))

  /** Показывается ли подсказка о расчёте калорий по БЖУ. */
  const isKcalCalculated = computed(
    () => form.per100g.kcal <= 0 && kcalPer100g.value > 0,
  )

  /** Пищевая ценность фактической порции для предпросмотра. */
  const portion = computed(() =>
    calculatePortionNutrition(form.per100g, form.weight),
  )

  /** Есть ли в форме хотя бы одно ненулевое значение питательности. */
  const hasNutritionData = computed(() =>
    Object.values(form.per100g).some((value) => value > 0),
  )

  /** Сбрасывает форму к начальным значениям. */
  function reset(): void {
    Object.assign(form, createEmptyMealForm())
  }

  /**
   * Проверяет форму и сохраняет приём пищи.
   * Возвращает true, если запись успешно добавлена.
   */
  async function submit(): Promise<boolean> {
    if (!form.name.trim()) {
      ElMessage.warning('Введите название блюда')
      return false
    }

    if (!form.weight || form.weight <= 0) {
      ElMessage.warning('Укажите вес порции')
      return false
    }

    if (!hasNutritionData.value) {
      ElMessage.warning('Укажите калорийность или БЖУ на 100 г')
      return false
    }

    isSubmitting.value = true
    try {
      await store.addMeal({
        name: form.name.trim(),
        weight: form.weight,
        per100g: normalizeNutritionPer100g(form.per100g),
      })
      ElMessage.success('Приём пищи добавлен')
      return true
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    isSubmitting,
    kcalPer100g,
    isKcalCalculated,
    portion,
    reset,
    submit,
  }
}
