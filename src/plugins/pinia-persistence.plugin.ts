import type { PiniaPlugin, PiniaPluginContext, StateTree } from 'pinia'
import { NUTRITION_STORE_ID } from '@/domains/nutrition/constants/nutrition.constants'
import type { NutritionSnapshot } from '@/domains/nutrition/types/nutrition.types'
import { useNutritionStorage } from '@/domains/nutrition/composables/useNutritionStorage'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    /** Включает автоматическое сохранение состояния стора в localStorage. */
    persist?: boolean
  }
}

/**
 * Глобальный Pinia-плагин сохранения состояния в localStorage.
 *
 * Подключается один раз в main.ts. Стору достаточно указать опцию
 * `persist: true` — плагин восстановит state при создании и будет
 * перехватывать все изменения через `$subscribe`, включая мутации
 * внутри асинхронных actions. Ручные вызовы сохранения в сторах не нужны.
 *
 * Сервис хранения не импортируется напрямую: плагин получает его через
 * `useNutritionStorage`, то есть через тот же DI-контейнер, что и остальное
 * приложение.
 */
export function createPiniaPersistencePlugin(): PiniaPlugin {
  return (context: PiniaPluginContext): void => {
    if (!context.options.persist || context.store.$id !== NUTRITION_STORE_ID) return

    const nutritionStorage = context.app.runWithContext(useNutritionStorage)
    const savedSnapshot = nutritionStorage.load()

    if (savedSnapshot) {
      context.store.$patch(savedSnapshot as StateTree)
    }

    context.store.$subscribe(
      (_mutation, state) => {
        const { meals, goal } = state as StateTree & NutritionSnapshot
        nutritionStorage.save({ meals, goal })
      },
      { detached: true, deep: true },
    )
  }
}
