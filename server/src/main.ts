import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { useDark, useToggle } from '@vueuse/core'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const theme = new URL(location.href.replace('#/', '')).searchParams.get('theme');
const isDark = theme === 'dark';
const isUseDark = useDark()
if (isDark !== isUseDark.value) {
  const toggleDark = useToggle(isUseDark)
  toggleDark();
}
app.use(router)
app.mount('#app')