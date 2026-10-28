import { useAppServices } from '@/composables/useAppServices'
import type { NutritionStorageService } from '@/domains/nutrition/services/nutrition-storage.service'

/** Возвращает сервис хранения состояния питания из DI-контейнера. */
export function useNutritionStorage(): NutritionStorageService {
  return useAppServices().nutritionStorage
}
