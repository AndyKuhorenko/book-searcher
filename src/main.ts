import { createApp } from 'vue'
import Paginate from 'vuejs-paginate-next'
import App from './App.vue'
import router from './router'
import { store, key } from './store/store'
import ComponentsList from './index'

const app = createApp(App)

app.use(store, key)

app.use(router)

app.use(Paginate)

ComponentsList.forEach((component: any) => app.component(component.name, component))

app.mount('#app')
