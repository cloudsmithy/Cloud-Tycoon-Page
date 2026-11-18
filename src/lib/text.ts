/**
 * 英文词组之间的空格换成不换行空格，避免「User / Group」「Serverless / API」被拆到两行。
 * 只处理英文和英文之间的空格；中英文之间的空格照常可以换行。
 */
export const keepWords = (text: string) => text.replace(/([A-Za-z0-9.:+–-]) (?=[A-Za-z0-9])/g, '$1\u00a0')
