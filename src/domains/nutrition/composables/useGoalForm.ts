import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useNutritionStore } from '@/domains/nutrition/stores/nutrition.store'
import type { GoalFormValues } from '@/domains/nutrition/types/nutrition.types'

/**
 * Управляет формой цели питания: заполнением из стора,
 * валидацией и асинхронным сохранением.
 */
export function useGoalForm() {
  const store = useNutritionStore()
  const form = reactive<GoalFormValues>({
    title: store.goal.title,
    kcal: store.goal.kcal,
    protein: store.goal.protein,
    fat: store.goal.fat,
    carbs: store.goal.carbs,
  })
  const isSubmitting = ref(false)

  /** Заполняет форму актуальными значениями цели из стора. */
  function fill(): void {
    Object.assign(form, {
      title: store.goal.title,
      kcal: store.goal.kcal,
      protein: store.goal.protein,
      fat: store.goal.fat,
      carbs: store.goal.carbs,
    })
  }

  /**
   * Проверяет форму и сохраняет цель.
   * Возвращает true, если изменения успешно применены.
   */
  async function submit(): Promise<boolean> {
    if (!form.title.trim()) {
      ElMessage.warning('Введите название цели')
      return false
    }

    if (!form.kcal) {
      ElMessage.warning('Укажите норму калорий')
      return false
    }

    isSubmitting.value = true
    try {
      await store.updateGoal({
        title: form.title.trim(),
        kcal: form.kcal || 0,
        protein: form.protein || 0,
        fat: form.fat || 0,
        carbs: form.carbs || 0,
      })
      ElMessage.success('Цель обновлена')
      return true
    } finally {
      isSubmitting.value = false
    }
  }

  return { form, isSubmitting, fill, submit }
}
