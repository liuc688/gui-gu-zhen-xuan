import { createApp } from 'vue'
import App from '@/App.vue'
// 引入模板的全局的样式
import '@/styles/index.scss'
// 引入 element-plus 插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// svg 插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象: 注册整个项目全局组件
import gloalComponent from '@/components'
// 配置 element-plus 国际化
// @ts-expect-error 它的作用是告诉 TypeScript 编译器忽略下一行代码中的错误，如果下一行代码没有错误，// @ts-expect-error 会引发一个新的错误，提示我们没有使用这个注释。
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入路由
import router from './router'
// 引入仓库
import pinia from './store'
// 获取应用实例对象
const app = createApp(App)
// 安装 element-plus 插件
app.use(ElementPlus, {
  locale: zhCn, // element-plus 国际化配置
})
// 安装自定义插件
app.use(gloalComponent)
// 安装仓库
app.use(pinia)
// 注册模板路由
app.use(router)
// 引入路由鉴权文件
import './permisstion'
// 引入自定义指令文件
import { isHasButton } from '@/directive/has'
isHasButton(app)
// 将应用挂载到挂载点上
app.mount('#app')
