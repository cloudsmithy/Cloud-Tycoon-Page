# 云上大亨 官网

[![Cloudflare Pages](https://img.shields.io/github/check-runs/cloudsmithy/Cloud-Tycoon-Page/master?nameFilter=Cloudflare%20Pages%3A%20cloud-tycoon-page&label=Cloudflare%20Pages&logo=cloudflare&logoColor=white)](https://github.com/cloudsmithy/Cloud-Tycoon-Page/commits/master)

线上地址：[中文](https://cloud-tycoon-page.pages.dev/) · [English](https://cloud-tycoon-page.pages.dev/en) · [日本語](https://cloud-tycoon-page.pages.dev/ja)

亚马逊云科技 User Group「云上大亨」的官方网站。React 18 + Vite 5 + TypeScript，浅色主题，中文、英文、日文三种语言，构建时预渲染成静态 HTML（利于搜索引擎收录，JS 加载前页面也完整可见）。

## 开发

```bash
npm install
npm run dev        # 本地开发 http://localhost:5173（英文、日文加 ?lang=en / ?lang=ja）
npm run build      # 类型检查 + 构建 + 预渲染，产物在 dist/
npm run preview    # 预览构建产物
npm run deploy     # 构建并部署到 Cloudflare Pages（首次先运行 npx wrangler login 登录）
```

`dist/` 是纯静态文件，`base` 为 `./`，可以放在域名根目录或任意子目录（GitHub Pages、Nginx、对象存储均可）。

## 自动部署

Cloudflare Pages 直接连着这个仓库：推送到 `master` 后，Cloudflare 自动拉代码、运行 `npm run build`、发布 `dist/`，GitHub 里不用配任何 secret。每次构建的结果会作为「Cloudflare Pages」检查显示在提交上，README 顶部的徽章读的就是它；构建日志在 Cloudflare 控制台「Workers 和 Pages → cloud-tycoon-page」。

Cloudflare 项目设置：生产分支 `master`，构建命令 `npm run build`，输出目录 `dist`，Node 版本由仓库里的 `.node-version` 指定。急用时也可以在本地运行 `npm run deploy` 直接上传。

## 多语言

- 页面上的中文就是翻译的 key：组件里写 `t('中文原文')`，译文放在 `src/i18n/en.json` 和 `ja.json`，带变量的用 `tf('共 {0} 轮', n)`。
- 构建时会列出没有译文的中文，改了文案能马上发现漏译；`I18N_STRICT=1 npm run build` 时有漏译直接让构建失败。
- 每种语言单独预渲染：`index.html`（中文）、`en.html`、`ja.html`，各自带 `lang`、标题、描述、hreflang 和分享图（`src/i18n/head.ts`）。
- 英文、日文页的游戏链接指向国际站对应语言（`linksFor()`，在 `src/content.ts`）；截图用 `public/images/shots/en/`、`ja/` 下的对应语言界面。
- 宣传片、规则书、更新日志和 PDF 只有中文，在英文、日文页上标「Chinese / 中国語」。
- 品牌统一写 Amazon Web Services；游戏名英文 Cloud Tycoon，日文クラウドタイクーン，术语以游戏仓库的词表为准。

## 目录

| 路径 | 内容 |
|---|---|
| `src/content.ts` | 全站文案、链接和数据（数字以游戏仓库为准） |
| `src/i18n/` | 翻译函数、英文和日文译文、各语言的 `<head>` |
| `src/components/` | 各个区块组件 |
| `src/lib/` | 滚动动效、数字滚动、视频弹窗 |
| `src/styles/site.css` | 全站样式 |
| `scripts/prerender.mjs` | 构建后把首页渲染成中文、英文、日文三份静态 HTML，并报告漏译 |
| `public/images/shots/` | 游戏真实截图（浅色模式；`en/`、`ja/` 是对应语言的界面） |
| `public/images/chars/` | 角色立绘 |
| `public/images/aws/` | 游戏内置的亚马逊云科技官方架构图标 |
| `public/videos/` | 宣传片和玩法讲解（自包含网页，约 52 MB，点击后才加载） |

素材都来自游戏仓库 https://github.com/cloudsmithy/aws_game 。

## 换域名

规范地址、hreflang 和分享图都用绝对地址，默认是 `https://cloud-tycoon-page.pages.dev/`。换正式域名时改 `scripts/prerender.mjs` 里 `SITE_URL` 的默认值；本地构建也可以临时指定，例如 `SITE_URL=https://example.com/ npm run build`。
