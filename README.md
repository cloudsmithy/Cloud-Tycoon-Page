# 云上大亨 官网

亚马逊云科技 User Group「云上大亨」的官方网站。React 18 + Vite 5 + TypeScript，浅色主题，构建时预渲染成静态 HTML（利于搜索引擎收录，JS 加载前页面也完整可见）。

## 开发

```bash
npm install
npm run dev        # 本地开发 http://localhost:5173
npm run build      # 类型检查 + 构建 + 预渲染，产物在 dist/
npm run preview    # 预览构建产物
npm run deploy     # 构建并部署到 Cloudflare Pages（首次先运行 npx wrangler login 登录）
```

`dist/` 是纯静态文件，`base` 为 `./`，可以放在域名根目录或任意子目录（GitHub Pages、Nginx、对象存储均可）。

## 目录

| 路径 | 内容 |
|---|---|
| `src/content.ts` | 全站文案、链接和数据（数字以游戏仓库为准） |
| `src/components/` | 各个区块组件 |
| `src/lib/` | 滚动动效、数字滚动、视频弹窗 |
| `src/styles/site.css` | 全站样式 |
| `scripts/prerender.mjs` | 构建后把首页渲染成静态 HTML |
| `public/images/shots/` | 游戏真实截图（浅色模式） |
| `public/images/chars/` | 角色立绘 |
| `public/images/aws/` | 游戏内置的亚马逊云科技官方架构图标 |
| `public/videos/` | 宣传片和玩法讲解（自包含网页，约 52 MB，点击后才加载） |

素材都来自游戏仓库 https://github.com/cloudsmithy/aws_game 。

## 部署前

- `index.html` 里的 `og:image` 是相对地址，确定正式域名后改成绝对地址，社交平台分享卡片才能显示图片。
