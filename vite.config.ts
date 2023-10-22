// https://vitejs.dev/config/
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入 svg 需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock 插件提供方法
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的对应的变量
  const env = loadEnv(mode, process.cwd())
  return {
    publicPath: 'https://gitee.com/jch1011/guiguzhenxuan',
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      /*
        viteMockServe 是一个用于 Vite 的模拟服务器插件，它可以帮助你在开发过程中模拟后端 API。
        viteMockServe({   localEnabled: command === 'serve',  })
        这段代码的意思是，当运行的命令是 serve 时（即在本地开发环境中），启用 viteMockServe 插件。
        如果运行的命令不是 serve（例如构建命令 build），则不启用该插件。这样可以确保在生产环境中不会启用模拟服务器，避免不必要的性能开销。
        这是一种常见的配置方式，用于区分开发环境和生产环境的行为。
      */
      viteMockServe({
        localEnabled: command === 'serve', // 保证开发阶段可以使用 mock 接口
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // scss 全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import"./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
