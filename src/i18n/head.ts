/**
 * 每种语言的 <head>：标题、描述、规范地址、hreflang、Open Graph、结构化数据。
 * 预渲染时写进 index.html / en.html / ja.html。
 */
import { LANGS, LANG_META, type Lang } from '.'

interface HeadText {
  title: string
  description: string
  keywords: string
  siteName: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  gameUrl: string
}

const HEAD: Record<Lang, HeadText> = {
  zh: {
    title: '云上大亨 · 亚马逊云科技 User Group 原创云架构桌游',
    description:
      '云上大亨是亚马逊云科技 User Group 原创的云架构桌游：买服务、做高可用、扛住 Health 事件、控制账单，把服务组成真实的架构收过路费。2–4 人，约 20 分钟一局，浏览器打开就能玩，免费、源码公开，支持联机和中英日三语。',
    keywords:
      '云上大亨,Cloud Tycoon,亚马逊云科技,User Group,云架构桌游,地产桌游,AWS 学习,Serverless,认证备考,CLF-C02,SAA-C03,AIF-C01',
    siteName: '云上大亨',
    ogTitle: '云上大亨 · 边玩边学的云架构桌游',
    ogDescription: '48 格棋盘、35 个云服务、48 种有效架构、6 种模式。令人怀念的经典桌游玩法，搬到云上。',
    ogImage: 'og.jpg',
    gameUrl: 'https://aws-game.usergroup.cn/',
  },
  en: {
    title: 'Cloud Tycoon · A cloud architecture board game by the Amazon Web Services User Group',
    description:
      'Cloud Tycoon is an original board game from the Amazon Web Services User Group: buy services, build high availability, ride out Health events, keep your bill in check, and combine services into real architectures to collect rent. 2–4 players, about 20 minutes a game, free in your browser, with online play in Chinese, English and Japanese.',
    keywords:
      'Cloud Tycoon,Amazon Web Services,User Group,board game,cloud architecture,Serverless,certification practice,CLF-C02,SAA-C03,AIF-C01',
    siteName: 'Cloud Tycoon',
    ogTitle: 'Cloud Tycoon · The cloud architecture board game you learn by playing',
    ogDescription: '48 squares, 35 cloud services, 48 architectures, 6 modes. The classic board game you remember, now in the cloud.',
    ogImage: 'og-en.jpg',
    gameUrl: 'https://cloudsmithy.github.io/aws_game/en/',
  },
  ja: {
    title: 'クラウドタイクーン · Amazon Web Services User Group 発のクラウドアーキテクチャ・ボードゲーム',
    description:
      'クラウドタイクーンは Amazon Web Services User Group が作ったオリジナルのボードゲームです。サービスを購入し、高可用性を整え、Health イベントを乗り切り、請求額を抑えながら、サービスを本物のアーキテクチャに組み上げて通行料を集めます。2〜4 人で 1 ゲーム約 20 分。ブラウザーで無料で遊べて、オンライン対戦と中国語・英語・日本語に対応しています。',
    keywords:
      'クラウドタイクーン,Cloud Tycoon,Amazon Web Services,User Group,ボードゲーム,クラウドアーキテクチャ,サーバーレス,認定試験対策,CLF-C02,SAA-C03,AIF-C01',
    siteName: 'クラウドタイクーン',
    ogTitle: 'クラウドタイクーン · 遊んで学べるクラウドアーキテクチャ・ボードゲーム',
    ogDescription: '48 マスのボード、35 のクラウドサービス、48 種類のアーキテクチャ、6 つのモード。懐かしい定番ボードゲームを、クラウドの上で。',
    ogImage: 'og-ja.jpg',
    gameUrl: 'https://cloudsmithy.github.io/aws_game/ja/',
  },
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** 正式地址。Cloudflare Pages 会把 en.html 跳到 /en，所以规范地址不带 .html */
export const pageUrl = (lang: Lang, site: string) => (lang === 'zh' ? site : `${site}${lang}`)

export function headHtml(lang: Lang, site: string): string {
  const h = HEAD[lang]
  const url = pageUrl(lang, site)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: h.siteName,
    alternateName: lang === 'zh' ? 'Cloud Tycoon' : '云上大亨',
    description: h.description,
    url: h.gameUrl,
    sameAs: ['https://cloudsmithy.github.io/aws_game/', 'https://github.com/cloudsmithy/aws_game'],
    genre: lang === 'zh' ? ['桌游', '教育'] : lang === 'en' ? ['Board game', 'Educational'] : ['ボードゲーム', '教育'],
    gamePlatform: lang === 'zh' ? 'Web 浏览器' : lang === 'en' ? 'Web browser' : 'Web ブラウザー',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    inLanguage: ['zh-CN', 'en', 'ja'],
    numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 4 },
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
    author: {
      '@type': 'Organization',
      name:
        lang === 'zh'
          ? '亚马逊云科技 User Group · 云上大亨开发小组'
          : lang === 'en'
            ? 'Amazon Web Services User Group · Cloud Tycoon dev team'
            : 'Amazon Web Services User Group · クラウドタイクーン開発チーム',
    },
  }
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="keywords" content="${esc(h.keywords)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${LANG_META[l].htmlLang}" href="${pageUrl(l, site)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('zh', site)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(h.siteName)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(h.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(h.ogDescription)}" />`,
    `<meta property="og:image" content="${site}${h.ogImage}" />`,
    `<meta property="og:locale" content="${LANG_META[lang].ogLocale}" />`,
    ...LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${LANG_META[l].ogLocale}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.join('\n    ')
}
