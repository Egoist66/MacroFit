import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useNutritionStore } from '@/domains/nutrition/stores/nutrition.store'
import type {
  GoalFormValues,
  NotificationSettings,
  UserProfile,
} from '@/domains/nutrition/types/nutrition.types'

/**
 * Управляет формой настроек: профилем пользователя,
 * целью питания и переключателями уведомлений.
 */
export function useNutritionSettings() {
  const store = useNutritionStore()

  const profile = reactive<UserProfile>({
    name: '',
    email: '',
  })

  const notifications = reactive<NotificationSettings>({
    reminders: false,
    reports: false,
    tips: false,
  })

  const goalForm = reactive<GoalFormValues>({
    title: store.goal.title,
    kcal: store.goal.kcal,
    protein: store.goal.protein,
    fat: store.goal.fat,
    carbs: store.goal.carbs,
  })

  const isSavingProfile = ref(false)
  const isSavingGoal = ref(false)

  watch(
    () => store.goal,
    (goal) => {
      Object.assign(goalForm, {
        title: goal.title,
        kcal: goal.kcal,
        protein: goal.protein,
        fat: goal.fat,
        carbs: goal.carbs,
      })
    },
    { deep: true, immediate: true },
  )

  /**
   * Сохраняет профиль пользователя.
   * Сейчас операция имитируется, чтобы сохранить асинхронный контракт
   * до подключения реального API.
   */
  async function saveProfile(): Promise<void> {
    if (!profile.name.trim()) {
      ElMessage.warning('Введите имя')
      return
    }

    if (!profile.email.includes('@')) {
      ElMessage.warning('Введите корректный e-mail')
      return
    }

    isSavingProfile.value = true
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 300))
      ElMessage.success('Профиль сохранён')
    } finally {
      isSavingProfile.value = false
    }
  }

  /** Проверяет и асинхронно сохраняет цель питания. */
  async function saveGoal(): Promise<void> {
    if (!goalForm.kcal) {
      ElMessage.warning('Укажите норму калорий')
      return
    }

    isSavingGoal.value = true
    try {
      await store.updateGoal({
        title: goalForm.title.trim() || store.goal.title,
        kcal: goalForm.kcal || 0,
        protein: goalForm.protein || 0,
        fat: goalForm.fat || 0,
        carbs: goalForm.carbs || 0,
      })
      ElMessage.success('Цель сохранена')
    } finally {
      isSavingGoal.value = false
    }
  }

  return {
    profile,
    notifications,
    goalForm,
    isSavingProfile,
    isSavingGoal,
    saveProfile,
    saveGoal,
  }
}
