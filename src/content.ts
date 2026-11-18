/**
 * 全站文案、链接和数据。
 * 数字和规则文字以游戏仓库（README、开局页、规则代码）为准，改游戏规则时同步这里。
 */
import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BrainCircuit,
  Earth,
  Flag,
  Flame,
  Gift,
  GraduationCap,
  Handshake,
  Hourglass,
  Layers,
  Network,
  PartyPopper,
  ReceiptText,
  Rocket,
  Scale,
  ShieldAlert,
  Sparkles,
  Sprout,
  Users,
  Wallet,
} from 'lucide-react'

export type Tone = 'orange' | 'violet' | 'red' | 'amber' | 'blue' | 'green' | 'pink'

/* ---------- 路径 ---------- */

const BASE = import.meta.env.BASE_URL
export const img = (path: string) => `${BASE}images/${path}`
const videoSrc = (file: string) => `${BASE}videos/${file}`

const REPO = 'https://github.com/cloudsmithy/aws_game'
const encodePath = (path: string) => path.split('/').map(encodeURIComponent).join('/')
const repoFile = (path: string) => `${REPO}/blob/master/${encodePath(path)}`

export const LINKS = {
  playCn: 'https://aws-game.usergroup.cn/',
  playIntl: 'https://cloudsmithy.github.io/aws_game/',
  playEn: 'https://aws-game.usergroup.cn/en/',
  playJa: 'https://aws-game.usergroup.cn/ja/',
  learnArch: 'https://aws-game.usergroup.cn/learn/arch/',
  learnSvc: 'https://aws-game.usergroup.cn/learn/svc/',
  changelog: `https://aws-game.usergroup.cn/docs/${encodeURIComponent('更新说明')}.html`,
  repo: REPO,
  issues: `${REPO}/issues`,
  docQuick: repoFile('docs/玩法速览.md'),
  docManual: repoFile('docs/玩法手册.md'),
  docRules: repoFile('docs/规则书.md'),
  handbookDir: `${REPO}/tree/master/${encodePath('docs/常用手册')}`,
} as const

export const handbookUrl = (file: string) => repoFile(`docs/常用手册/${file}`)

/* ---------- 导航 ---------- */

export const NAV_ITEMS = [
  { id: 'features', label: '玩法' },
  { id: 'modes', label: '模式' },
  { id: 'dlc', label: '扩展包' },
  { id: 'roles', label: '角色' },
  { id: 'learn', label: '学习中心' },
  { id: 'videos', label: '视频' },
  { id: 'events', label: '线下活动' },
  { id: 'faq', label: '常见问题' },
] as const

/* ---------- 视频（宣传片网页都是自包含的 HTML，放在 public/videos） ---------- */

export interface VideoItem {
  id: string
  title: string
  duration: string
  src: string
  note?: string
}

export const VIDEOS = {
  trailer: { id: 'trailer', title: '云上大亨 完整宣传片', duration: '3:25', src: videoSrc('trailer.html'), note: '序章短剧 · 玩法亮点 · 片尾彩蛋' },
  teaser: { id: 'teaser', title: '短宣传片', duration: '0:52', src: videoSrc('teaser.html'), note: '52 秒，一口气看完云上大亨的精彩瞬间' },
  guide: { id: 'guide', title: '完整玩法讲解', duration: '5:29', src: videoSrc('guide.html'), note: '跟着旁白走一局，5 分钟轻松上手' },
  fun: { id: 'fun', title: '娱乐模式 玩法讲解', duration: '1:53', src: videoSrc('guide-fun.html') },
  intro: { id: 'intro', title: '入门局 玩法讲解', duration: '1:54', src: videoSrc('guide-intro.html') },
  standard: { id: 'standard', title: '标准局 玩法讲解', duration: '1:28', src: videoSrc('guide-standard.html') },
  full: { id: 'full', title: '完整局 玩法讲解', duration: '1:23', src: videoSrc('guide-full.html') },
  learn: { id: 'learn', title: '学习模式 玩法讲解', duration: '1:24', src: videoSrc('guide-learn.html') },
  hell: { id: 'hell', title: '地狱模式 玩法讲解', duration: '1:28', src: videoSrc('guide-hell.html') },
} satisfies Record<string, VideoItem>

/* ---------- 数据条 ---------- */

export const STATS = [
  { value: 48, label: '格棋盘' },
  { value: 35, label: '个云服务' },
  { value: 95, label: '张事件卡牌' },
  { value: 48, label: '种有效架构' },
  { value: 242, label: '道知识题' },
  { value: 6, label: '种游戏模式' },
]

/* ---------- 核心玩法 ---------- */

export interface Feature {
  icon: LucideIcon
  tone: Tone
  title: string
  desc: string
}

export const FEATURES: Feature[] = [
  {
    icon: ReceiptText,
    tone: 'orange',
    title: '按真实特性计费',
    desc: '实例要自己做多 AZ，Serverless 没人用就不花钱，Bedrock 按 token 收费。每块服务都按它的真实特性计费和升级。',
  },
  {
    icon: Network,
    tone: 'violet',
    title: '组成架构，联合收租',
    desc: '48 种有效架构，很多格子可以二选一。凑齐一套就按整套收过路费，几个架构还能串联收费。',
  },
  {
    icon: Gift,
    tone: 'pink',
    title: 're:Invent 好运卡',
    desc: '38 张 re:Invent 卡：拿到 Activate Credits、Hackathon 拿奖、考过认证……再加 30 张 Health 事件卡考验架构功底，每张都附一条知识点。',
  },
  {
    icon: Sparkles,
    tone: 'amber',
    title: '一局一次的翻盘技',
    desc: '总资产跌破开局资金一半时发动专属技能，再「战略并购」最强对手的一块服务。模拟里翻盘率约 12%。',
  },
  {
    icon: Users,
    tone: 'blue',
    title: '同屏、联机、观战',
    desc: '一台电脑 2–4 人轮流玩，或者各用各的电脑、手机联机，画面实时同步。人数不够就加电脑玩家。',
  },
  {
    icon: GraduationCap,
    tone: 'green',
    title: '边玩边答题',
    desc: '开启后，买服务、付过路费时答对就有折扣。共 242 道知识题，含 CLF、SAA、AIF 三个认证题库。',
  },
]

/* ---------- 游戏画面 ---------- */

export interface ShowcaseRow {
  id: 'deed' | 'cards' | 'arch' | 'setup'
  eyebrow: string
  title: string
  text: string
  points?: string[]
}

export const SHOWCASE: ShowcaseRow[] = [
  {
    id: 'deed',
    eyebrow: 'Service Card',
    title: '每块服务，都按它真实的样子计费',
    text: '点开任意格子就是一张服务卡：它是什么、常用来做什么、升级路线、过路费和运行费，还有它能参与的有效架构。',
    points: [
      'EC2 买来只在一个 AZ，升到第 2 级「跨 AZ Auto Scaling」才算多 AZ',
      '每圈结算运行费，经过 Startup 扶持还能领 Credits',
      '离哪个架构还差哪几块，服务卡上一眼看清',
    ],
  },
  {
    id: 'cards',
    eyebrow: 'Event Cards',
    title: '每抽一张卡，都是一次云上好运',
    text: '38 张 re:Invent 卡带来惊喜和奖励，30 张 Health 事件卡考验你的架构功底；4 个玩法 DLC 和代理商模式全开时一共 95 张，每张都附一条知识点。',
    points: [
      '拿到 Activate 创业扶持 Credits：每有一个生效的架构，再多领 $50',
      'Hackathon 拿了奖、考过 Solutions Architect 认证，都能换成实打实的奖励',
      '技术分享会、Office Hours、白板画架构，线下一起玩更热闹',
    ],
  },
  {
    id: 'arch',
    eyebrow: 'Architectures',
    title: '把服务组成架构，联合收过路费',
    text: '游戏里有 48 种真实的云架构，很多格子可以二选一。凑齐一套就按整套收费，几个架构还能串联收费。',
  },
  {
    id: 'setup',
    eyebrow: 'Game Setup',
    title: '五步设置，马上开局',
    text: '选好人数、难度和胜利条件就能开打，需要的话再开联机和 DLC；还没想好，就先点「先看玩法」。',
    points: [
      '人数不够，勾上「电脑」加电脑玩家',
      '胜利条件可以多选：Well-Architected、轮数上限、限时',
      '联机时各用各的电脑或手机，画面实时同步，还能邀请观战',
    ],
  },
]

export const ARCH_CATEGORIES: [string, number][] = [
  ['网站与 API', 14],
  ['事件与流程', 9],
  ['数据与分析', 8],
  ['AI 与智能体', 10],
  ['安全与合规', 7],
]

export interface ArchNode {
  icon: string
  label: string
  alt?: string
  optional?: boolean
}

export interface Architecture {
  name: string
  category: string
  required: number
  optional: number
  desc: string
  flow: ArchNode[]
  perk?: string
}

export const ARCHS: Architecture[] = [
  {
    name: 'Serverless API',
    category: '网站与 API',
    required: 3,
    optional: 3,
    desc: '最常见的无服务器后端：App、小程序、网站的接口。按请求计费，流量忽高忽低也不用管服务器。',
    flow: [
      { icon: 'cloudfront', label: 'CloudFront', optional: true },
      { icon: 'apigw', label: 'API Gateway' },
      { icon: 'lambda', label: 'Lambda' },
      { icon: 'dynamodb', label: 'DynamoDB', alt: '或 Aurora' },
    ],
  },
  {
    name: '经典三层 Web',
    category: '网站与 API',
    required: 3,
    optional: 4,
    desc: '传统网站和企业系统的标准搭法：负载均衡、应用服务器、数据库各一层，各层可以单独扩容。',
    flow: [
      { icon: 'route53', label: 'Route 53', optional: true },
      { icon: 'elb', label: 'ELB' },
      { icon: 'ec2', label: 'EC2', alt: '或 ECS' },
      { icon: 'rds', label: 'RDS', alt: '或 Aurora' },
    ],
  },
  {
    name: '高可用入口',
    category: '网站与 API',
    required: 3,
    optional: 3,
    desc: '对外入口做高可用：DNS 健康检查加跨 AZ 负载均衡，一台机器或一个 AZ 出问题也能自动切走，服务照常在线。',
    flow: [
      { icon: 'route53', label: 'Route 53' },
      { icon: 'cloudfront', label: 'CloudFront', optional: true },
      { icon: 'elb', label: 'ELB' },
      { icon: 'ec2', label: 'EC2' },
    ],
    perk: 'EC2 升「跨 AZ Auto Scaling」半价',
  },
  {
    name: '订单削峰',
    category: '事件与流程',
    required: 3,
    optional: 1,
    desc: '秒杀、大促这类突发流量：先把请求排进队列，后端按自己的节奏处理，网站不被压垮。',
    flow: [
      { icon: 'ec2', label: 'EC2', alt: '或 ECS' },
      { icon: 'sqs', label: 'SQS' },
      { icon: 'lambda', label: 'Lambda' },
      { icon: 'dynamodb', label: 'DynamoDB', alt: '或 RDS、Aurora', optional: true },
    ],
    perk: '免疫「流量暴增」，扛住了还能领钱',
  },
  {
    name: 'GenAI 知识库（RAG）',
    category: 'AI 与智能体',
    required: 3,
    optional: 1,
    desc: '让大模型按公司自己的资料回答，减少胡编：客服知识库、内部问答、文档助手。',
    flow: [
      { icon: 's3', label: 'S3' },
      { icon: 'lambda', label: 'Lambda', optional: true },
      { icon: 'bedrock', label: 'Bedrock' },
      { icon: 'opensearch', label: 'OpenSearch', alt: '或 Aurora' },
    ],
    perk: '别人落在你的 Bedrock 上，额外付你 $50',
  },
]

/* ---------- 模式 ---------- */

export interface Mode {
  id: string
  name: string
  tag: string
  icon: LucideIcon
  tone: Tone
  level: number
  desc: string
  pace: string
  fit: string
  video: VideoItem
}

export const MODES: Mode[] = [
  {
    id: 'fun',
    name: '娱乐模式',
    tag: '节奏最快',
    icon: PartyPopper,
    tone: 'pink',
    level: 1,
    desc: '20 个常用服务，其余是盲盒格；默认 10 轮，节奏最快。',
    pace: '默认 10 轮',
    fit: '聚会暖场、第一次接触',
    video: VIDEOS.fun,
  },
  {
    id: 'intro',
    name: '入门局',
    tag: '规则最少',
    icon: Sprout,
    tone: 'green',
    level: 2,
    desc: '只有基础规则：买服务、收过路费、运行费、维护窗口。',
    pace: '按开局设置的胜利条件',
    fit: '新手、课堂教学',
    video: VIDEOS.intro,
  },
  {
    id: 'standard',
    name: '标准局',
    tag: '默认',
    icon: Scale,
    tone: 'blue',
    level: 3,
    desc: '在入门局的基础上，再加技术债、新账户保护期、季度财报。',
    pace: '默认打满 15 轮，约 20 分钟',
    fit: '大多数玩家',
    video: VIDEOS.standard,
  },
  {
    id: 'full',
    name: '完整局',
    tag: '策略最深',
    icon: Layers,
    tone: 'violet',
    level: 4,
    desc: '在标准局的基础上，再加主动行动、完整交易、Savings Plans / RI。',
    pace: '不设轮数上限时约 30 轮分出胜负',
    fit: '老玩家、策略党',
    video: VIDEOS.full,
  },
  {
    id: 'learn',
    name: '学习模式',
    tag: '备考',
    icon: GraduationCap,
    tone: 'orange',
    level: 3,
    desc: '标准局加上必答题和错题本，不限轮数，节奏自己定。',
    pace: '不限轮数',
    fit: '自学、备考认证',
    video: VIDEOS.learn,
  },
  {
    id: 'hell',
    name: '地狱模式',
    tag: '硬核',
    icon: Flame,
    tone: 'red',
    level: 5,
    desc: '完整局加全部 DLC，必须答题，卡牌金额 ×2；每个角色还多一条地狱限制。',
    pace: '不设轮数上限时约 21 轮分出胜负',
    fit: '想挑战极限的云架构师',
    video: VIDEOS.hell,
  },
]

export const WIN_CONDITIONS = [
  { icon: Award, title: 'Well-Architected', desc: '谁先凑齐六大支柱谁赢；难度越高，每条支柱要的分越多。' },
  { icon: Flag, title: '轮数上限', desc: '打满设定的轮数（默认 15 轮），按估值排名。' },
  { icon: Hourglass, title: '限时', desc: '时间到了按估值算分，活动现场方便控时。' },
]

export const WIN_NOTE = '胜利条件可以多选，谁先达成谁赢；只剩一人没破产也直接获胜。'

/* ---------- 扩展包 ---------- */

export const DLCS = [
  {
    icon: BrainCircuit,
    tone: 'violet' as Tone,
    name: 'GenAI 浪潮',
    rule: 'AI 组过路费 ×1.5；多 2 张 Health 卡、3 张 re:Invent 卡、6 道 AI 题。',
    cards: ['Bedrock 上了新模型', '拿到生成式 AI 创新中心支持', 'AI Agent 上线'],
  },
  {
    icon: ShieldAlert,
    tone: 'red' as Tone,
    name: '安全攻防',
    rule: 'FIS 攻击打 8 折；安全组过路费 ×1.3；多 3 张 Health 卡、2 张 re:Invent 卡、4 道安全题。',
    cards: ['通过了安全合规审计', 'Security Hub CSPM 全绿'],
  },
  {
    icon: Wallet,
    tone: 'green' as Tone,
    name: 'FinOps 账单大战',
    rule: '所有运行费 ×1.5；任何难度都能签 Savings Plans / RI；多 2 张 Health 卡、2 张 re:Invent 卡、4 道成本题。',
    cards: ['成本异常检测发现一笔浪费', 'Compute Optimizer 建议降配'],
  },
  {
    icon: Earth,
    tone: 'blue' as Tone,
    name: '全球出海',
    rule: '有多区域功能的服务过路费再 +30%；多 2 张 Health 卡、2 张 re:Invent 卡、4 道全球化题。',
    cards: ['新 Region 开服', '入选海外市场加速计划'],
  },
]

export const CERTS = [
  { code: 'CLF-C02', name: 'Cloud Practitioner', count: 40 },
  { code: 'SAA-C03', name: 'Solutions Architect – Associate', count: 40 },
  { code: 'AIF-C01', name: 'AI Practitioner', count: 30 },
]

export const SWITCHES = [
  {
    icon: Rocket,
    name: '高速部署',
    desc: '部署点数 0–12，每回合 +1，攒够点数就能发动 12 种技能；点数越高技能越强，12 点能让对手的服务暂停营业 2 回合。',
  },
  {
    icon: Handshake,
    name: '代理商模式',
    desc: '座位可以当代理商（不超过一半）：落在空地上按进货价 5 折占地，客户落在代理商的地上可以从他手里买；另加 3 张 Health 卡、6 张 re:Invent 卡。',
  },
]

/* ---------- 角色 ---------- */

export interface Role {
  name: string
  type: 'customer' | 'agent'
  perk: string
  skill: string
  effect: string
}

export const ROLES: Role[] = [
  { name: '车库创业公司', type: 'customer', perk: '每次经过或停在 Startup 扶持，多领 $50', skill: 'Activate 加码', effect: '领 $1200，接下来 3 圈经过 Startup 扶持时运行费全免' },
  { name: '传统企业上云', type: 'customer', perk: '买 EC2、RDS 打 85 折', skill: 'MAP 迁移补贴', effect: '名下实例型服务各免费升一级，再领 $300；接下来 3 圈运行费减半' },
  { name: '独角兽', type: 'customer', perk: '开局免费拿到 Route 53', skill: '新一轮融资', effect: '领一笔 $1000–$2000 的融资' },
  { name: '金融合规公司', type: 'customer', perk: '买安全组服务打 8 折，免疫「安全审计没过」', skill: '监管沙盒', effect: '技术债清零，这一轮和接下来 2 轮免疫所有 Health 事件，领 $800' },
  { name: 'AI 原生公司', type: 'customer', perk: '买 AI 组服务打 9 折', skill: '生成式 AI 加速器', effect: 'AI 组服务各免费升一级，再领 $400；3 轮内 AI 组过路费 ×2' },
  { name: '跨境电商', type: 'customer', perk: '买网络组服务打 8 折', skill: '黑五网一', effect: '领 $500；接下来 3 个回合，所有服务的过路费 ×2' },
  { name: 'SaaS 创业公司', type: 'customer', perk: '买 Lambda、API Gateway、DynamoDB 和应用集成组服务打 8 折', skill: '上架 Marketplace', effect: '接下来 4 个回合，每位对手付你 $150 订阅费' },
  { name: '游戏工作室', type: 'customer', perk: 'Spot 最低出价只要原价的 10%', skill: '爆款上线', effect: '领 $400；接下来 4 笔别人付你的过路费 ×3' },
  { name: '独立开发者', type: 'customer', perk: '不开「边玩边答题」也能答题打折，开了折扣更大', skill: '开源走红', effect: '领 $400，再从没人买的服务里挑 2 块白拿' },
  { name: '数据智能公司', type: 'customer', perk: '买分析组服务打 8 折', skill: '数据变现', effect: '每持有一块服务领 $200' },
  { name: '短视频平台', type: 'customer', perk: '买存储组服务打 8 折', skill: '现象级爆款', effect: '每位对手付你 $300' },
  { name: '互联网医疗', type: 'customer', perk: '买数据库组服务打 8 折，免疫「实习生误删了生产数据」', skill: '紧急救治', effect: '所有 Impaired 和被打下线的服务马上恢复，技术债清零，领 $1000' },
  { name: '总代理', type: 'agent', perk: '按进货价 45 折从亚马逊云科技拿货', skill: '年度返点', effect: '领客户从你手里买的服务总价的一半（最少 $800）' },
  { name: '托管服务商（MSP）', type: 'agent', perk: '进货价 5 折；客户每块服务每圈再付 $10 托管费', skill: '托管续约', effect: '每位客户付你 $400，你再领 $300' },
  { name: '咨询合作伙伴', type: 'agent', perk: '进货价 5 折；每有一位客户从你手里买过服务，估值 +$100', skill: '解决方案打包', effect: '领 $400，再挑 2 块原价不超过 $400 的服务白拿' },
]

export const PARTNERS = [
  { name: '韩叔', img: 'chars/han_front.webp', width: 402, height: 560 },
  { name: '虫虫', img: 'chars/chong_front.webp', width: 373, height: 560 },
  { name: 'Damo', img: 'chars/damo_front.webp', width: 450, height: 560 },
  { name: 'Yuki', img: 'chars/yuki_front.webp', width: 302, height: 560 },
]

/* ---------- 学习中心 ---------- */

export const LEARN = {
  arch: {
    title: '架构讲解',
    href: LINKS.learnArch,
    desc: '游戏里的 48 个有效架构，每个两页：三维动画讲解视频，一块一块讲、带配音；图文讲解数据怎么走、每一块干什么、几选一怎么选、在游戏里怎么算。',
    stats: [
      ['48', '个有效架构'],
      ['96', '页讲解'],
      ['505', '句配音'],
    ],
  },
  svc: {
    title: '服务知识点',
    href: LINKS.learnSvc,
    desc: '游戏里的 38 块服务，每块一页：它是什么、为什么用它、核心知识点、三个关键功能、和谁比怎么选，附练习题和它用在哪些架构。',
    stats: [
      ['38', '块服务'],
      ['194', '条核心知识点'],
      ['170', '道练习题'],
    ],
  },
}

export const SVC_ICONS = ['s3', 'lambda', 'ec2', 'dynamodb', 'cloudfront', 'apigw', 'sqs', 'rds', 'bedrock', 'sagemaker', 'guardduty', 'cloudwatch']

/* ---------- 线下活动 ---------- */

export const UG_PRESET = '线下活动用：娱乐模式 + 边玩边答题，打 12 轮或 30 分钟（先到为准），4 人一桌。'

export const HANDBOOKS = [
  { file: '1-玩法速览.pdf', title: '玩法速览', desc: '几分钟看懂怎么玩' },
  { file: '2-玩法手册.pdf', title: '玩法手册', desc: '完整规则和细节判定' },
  { file: '3-速查卡.pdf', title: '速查卡', desc: '对局时随手查' },
  { file: '4-主持人规则书.pdf', title: '主持人规则书', desc: '给主持人的完整规则' },
  { file: '5-UG 活动流程单.pdf', title: 'UG 活动流程单', desc: '活动当天的流程安排' },
  { file: '6-卡牌（实体版打印）.pdf', title: '卡牌', desc: '实体版打印文件', print: true },
  { file: '7-棋盘与配件（实体版打印）.pdf', title: '棋盘与配件', desc: '实体版打印文件', print: true },
]

/* ---------- 版本与更新（取自游戏仓库 docs/更新说明.html，发新版时同步） ---------- */

export const RELEASE = {
  version: 'v1.16',
  headline: '第十六轮更新：受邀观战、联机鉴权',
}

export const CHANGELOG_ROUNDS = 16

export const CHANGELOG = [
  { round: '第十六轮', date: '11-11～13', title: '受邀观战、联机鉴权、棋盘对齐、下线改规则', latest: true },
  { round: '第十五轮', date: '11-10', title: '英文版、日文版、语言菜单、老板键、版本号' },
  { round: '第十四轮', date: '11-10', title: '免责声明、搜索、矮窗口布局' },
  { round: '第十三轮', date: '11-08～09', title: '官方分类色组、Cognito、更多架构、讲解和知识点页' },
]

/* ---------- 作者寄语（摘自游戏仓库 README） ---------- */

export const AUTHOR_NOTE = {
  paragraphs: [
    '我曾经是个爱玩的孩子。儿时和小伙伴围在一起玩经典地产类桌游：大家去买地、收租金，最后按照资产的高低分出输赢，简单又热闹。',
    '二十年后的某个夜晚，我忽然有了这样的灵感：参考一部分经典地产类桌游的规则，再做一些延伸，把自己对亚马逊云科技的了解和架构知识，通过游戏的方式传播出去，让大家在玩的同时，轻松学到云架构知识；而且要本土化，做一款我们自己的游戏。于是便有了「云上大亨」。',
    '希望 User Group 能帮助更多的小伙伴快速上手亚马逊云科技，也希望你在这里，能找回小时候和小伙伴围在一起掷骰子的那份快乐。',
  ],
  signature: 'User Group 云上大亨小组',
  href: `${REPO}#${encodeURIComponent('作者寄语')}`,
}

/* ---------- 常见问题 ---------- */

export interface FaqItem {
  q: string
  a: string
  link?: { label: string; href: string }
}

export const FAQ: FaqItem[] = [
  { q: '要付费或者注册吗？', a: '不用。云上大亨完全免费，打开网页就能玩，不需要注册账号，也不用安装任何东西。游戏源码公开在 GitHub 上。' },
  { q: '支持几个人一起玩？', a: '2–4 人。可以在同一台电脑上轮流操作，也可以各用各的电脑或手机联机，画面实时同步，还能邀请朋友观战。人数不够时可以加电脑玩家。' },
  { q: '不懂云计算也能玩吗？', a: '能。入门局只保留买服务、收过路费、运行费和维护窗口这些基础规则；每块服务、每个架构都有讲解页，边玩边学。' },
  { q: '一局要玩多久？', a: '默认打满 15 轮按估值排名，大约 20 分钟；娱乐模式默认 10 轮，更快。也可以设成限时，或者不设轮数上限打到分出胜负。' },
  { q: '国内访问慢怎么办？', a: '国内用户请走国内线路 aws-game.usergroup.cn；海外用户可以用 GitHub Pages 上的国际线路，两条线路内容一致。', link: { label: '打开国际线路', href: LINKS.playIntl } },
  { q: '能在线下活动里用，或者打印成实体桌游吗？', a: '可以。开局页有「UG 活动局」一键开局；仓库里还有主持人规则书、UG 活动流程单、速查卡，以及可以打印的卡牌、棋盘与配件。' },
  { q: '游戏里的价格是真实定价吗？', a: '不是。游戏内价格为虚构，不代表实际定价，$ 是游戏币单位。' },
  { q: '发现 bug 或者对规则有疑问？', a: '欢迎到 GitHub Issues 反馈，开发小组会跟进。', link: { label: '去 GitHub 反馈', href: LINKS.issues } },
]

/* ---------- 页脚 ---------- */

export const FOOTER_COLUMNS = [
  {
    title: '开始游戏',
    links: [
      { label: '国内线路', href: LINKS.playCn },
      { label: '国际线路（GitHub Pages）', href: LINKS.playIntl },
      { label: 'English', href: LINKS.playEn },
      { label: '日本語', href: LINKS.playJa },
    ],
  },
  {
    title: '学习资料',
    links: [
      { label: '架构讲解', href: LINKS.learnArch },
      { label: '服务知识点', href: LINKS.learnSvc },
      { label: '玩法手册', href: LINKS.docManual },
      { label: '规则书', href: LINKS.docRules },
    ],
  },
  {
    title: '社区',
    links: [
      { label: 'GitHub 仓库', href: LINKS.repo },
      { label: '问题反馈', href: LINKS.issues },
      { label: '更新说明', href: LINKS.changelog },
      { label: '常用手册（PDF）', href: LINKS.handbookDir },
    ],
  },
]

export const DISCLAIMERS = [
  '免责声明：游戏里特定亚马逊云科技生成式人工智能相关的服务仅在亚马逊云科技海外区域可用，亚马逊云科技 User Group 仅为帮助您了解行业前沿技术和发展海外业务选择推介该服务。亚马逊云科技中国区域相关云服务由西云数据和光环新网运营，具体信息以中国区域官网为准。',
  '游戏内价格为虚构，不代表实际定价；$ 是游戏币单位。本游戏为原创作品，规则借鉴了已进入公共领域的经典地产类桌游机制（可追溯至 1904 年的 The Landlord\'s Game），与任何第三方品牌无关联、无授权关系。',
]
