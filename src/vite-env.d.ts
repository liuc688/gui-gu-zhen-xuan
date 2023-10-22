// / <reference types="vite/client" />
// 解决 ts 文件引入 vue 文件出现红色警告问题
// 声明一个模块匹配所有 .vue 文件
declare module '*.vue' {
  // 从 'vue' 包中导入 defineComponent 函数
  import { defineComponent } from 'vue'
  // 定义 Component 为 defineComponent 函数的返回类型
  const Component: ReturnType<typeof defineComponent>
  // 默认导出 Component
  export default Component
}
// 定义 ImportMetaEnv 接口，包含所有 Vite 环境变量的类型
interface ImportMetaEnv {
  VITE_APP_BASE_API?: string
  // 在这里添加其他的环境变量
}
// 在 ImportMeta 接口中添加 env 属性，其类型为 ImportMetaEnv
interface ImportMeta {
  env: ImportMetaEnv
}
