import type { InjectionKey } from 'vue'
import {
  NutritionStorageService,
} from '@/domains/nutrition/services/nutrition-storage.service'

/**
 * Контракт глобальных сервисов приложения.
 * Любой новый сервис добавляется сюда и становится доступен через DI.
 */
export interface AppServices {
  readonly nutritionStorage: NutritionStorageService
}

/** Ключ DI-контейнера с сервисами приложения. */
export const servicesKey: InjectionKey<AppServices> = Symbol('app-services')

/** Создаёт экземпляры всех сервисов приложения. */
export function createAppServices(): AppServices {
  return {
    nutritionStorage: new NutritionStorageService(),
  }
}
