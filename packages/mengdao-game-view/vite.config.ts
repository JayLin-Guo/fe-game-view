import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'
  const shouldAnalyze = env.VITE_BUILD_ANALYZE === 'true'

  const plugins = [vue()]

  // 生产环境添加打包分析
  if (isProduction && shouldAnalyze) {
    plugins.push(
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as any
    )
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      open: true,
      host: true, // 允许外部访问
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction, // 只在非生产环境生成 sourcemap
      minify: 'terser', // 使用 terser 压缩
      terserOptions: {
        compress: {
          drop_console: isProduction, // 生产环境移除 console
          drop_debugger: true, // 移除 debugger
        },
      },
      rollupOptions: {
        output: {
          // 分包策略
          manualChunks: {
            // Vue 相关
            vue: ['vue', 'vue-router', 'pinia'],
            // Element Plus 相关
            'element-plus': ['element-plus', '@element-plus/icons-vue'],
            // 工具库
            utils: ['axios'],
          },
          // 文件命名
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: assetInfo => {
            if (!assetInfo.names || !assetInfo.names[0]) {
              return 'assets/[name]-[hash][extname]'
            }
            const name = assetInfo.names[0]
            const info = name.split('.')
            const extType = info[info.length - 1]
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(name)) {
              return `media/[name]-[hash].${extType}`
            }
            if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(name)) {
              return `images/[name]-[hash].${extType}`
            }
            if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(name)) {
              return `fonts/[name]-[hash].${extType}`
            }
            return `assets/[name]-[hash].${extType}`
          },
        },
      },
      // 构建优化
      chunkSizeWarningLimit: 1000, // 提高 chunk 大小警告限制
      assetsInlineLimit: 4096, // 小于 4kb 的资源内联为 base64
    },
    // CSS 配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`, // 全局 SCSS 变量
        },
      },
    },
    // 优化依赖
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'element-plus', '@element-plus/icons-vue', 'axios'],
    },
    // 环境变量配置
    define: {
      __VUE_OPTIONS_API__: false, // 禁用 Options API 以减少包大小
      __VUE_PROD_DEVTOOLS__: false, // 生产环境禁用 devtools
    },
  }
})
