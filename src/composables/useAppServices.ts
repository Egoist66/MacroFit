import { inject } from 'vue'
import type { AppServices } from '@/services/app-services'
import { servicesKey } from '@/services/app-services'

/**
 * Возвращает типизированный набор сервисов приложения.
 * Вызывается в setup-контексте компонента или композабла,
 * а также через `app.runWithContext` в Pinia-плагинах.
 */
export function useAppServices(): AppServices {
  const services = inject(servicesKey)

  if (!services) {
    throw new Error('Сервисы приложения не подключены. Установите createServicesPlugin.')
  }

  return services
}
