# 云上大亨 官网

[![Deploy to Cloudflare Pages](https://github.com/cloudsmithy/Cloud-Tycoon-Page/actions/workflows/deploy-cloudflare.yml/badge.svg?branch=master)](https://github.com/cloudsmithy/Cloud-Tycoon-Page/actions/workflows/deploy-cloudflare.yml)

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

推送到 `master` 后，GitHub Actions 会自动构建并发布到 Cloudflare Pages，README 顶部的徽章就是这一步的结果。第一次使用前，在仓库 Settings → Secrets and variables → Actions 里添加两个 secret：

| 名称 | 内容 |
|---|---|
| `CLOUDFLARE_API_TOKEN` | 在 Cloudflare「我的个人资料 → API 令牌」新建，权限只给「帐户 → Cloudflare Pages → 编辑」 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 帐户 ID，在控制台右侧栏或 `npx wrangler whoami` 里能看到 |

本地也可以直接运行 `npm run deploy` 发布。

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

规范地址、hreflang 和分享图都用绝对地址，默认是 `https://cloud-tycoon-page.pages.dev/`。换正式域名时构建前设 `SITE_URL`，例如 `SITE_URL=https://example.com/ npm run build`；用 GitHub Actions 部署的话，在 workflow 的 Build 步骤里加同名环境变量。
