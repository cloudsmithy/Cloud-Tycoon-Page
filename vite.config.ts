import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // 相对路径：构建产物放在域名根目录或任意子目录都能用
  base: './',
  // 预渲染时把图标库打进 SSR 包，避免 Node 直接加载它的 ESM/CJS 入口
  ssr: { noExternal: ['lucide-react'] },
  build: {
    // public/ 里有几十 MB 的宣传片网页，SSR 构建不需要再拷一份
    copyPublicDir: !isSsrBuild,
  },
}))
