import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ru from 'element-plus/es/locale/lang/ru'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import './assets/css/style.scss'
import App from './App.vue'
import { router } from './router/router'
import { createAppServices } from './services/app-services'
import { createServicesPlugin } from './plugins/services.plugin'
import { createPiniaPersistencePlugin } from './plugins/pinia-persistence.plugin'

dayjs.locale('ru')

const app = createApp(App)
const appServices = createAppServices()

app.use(createServicesPlugin(appServices))

const pinia = createPinia()
pinia.use(createPiniaPersistencePlugin())
app.use(pinia)

app.use(ElementPlus, { locale: ru })
app.use(router)
app.mount('#app')
