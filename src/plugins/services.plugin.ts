import type { App, Plugin } from 'vue'
import type { AppServices } from '@/services/app-services'
import { servicesKey } from '@/services/app-services'

/**
 * Подключает сервисы приложения глобально.
 * Экземпляры создаются в main.ts и передаются в плагин,
 * поэтому приложение использует единый DI-контейнер.
 */
export function createServicesPlugin(services: AppServices): Plugin {
  return {
    install(app: App): void {
      app.provide(servicesKey, services)
    },
  }
}
