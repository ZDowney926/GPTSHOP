export type Plan = {
  slug: string;
  name: string;
  tier: string;
  price: number;
  originalPrice?: number;
  cta: string;
  featured: boolean;
  items: string[];
};

export const plans: Plan[] = [
  {
    slug: "plus-recharge",
    name: "ChatGPT Plus 充值",
    tier: "充值 Plus",
    price: 179,
    originalPrice: 189,
    cta: "立即升级",
    featured: true,
    items: [
      "访问 GPT-5 等最新模型能力",
      "支持 Codex CLI、App 端等代码理解与生成",
      "Projects 项目能力",
      "无需账密，保障信息安全",
    ],
  },
  {
    slug: "ready-account",
    name: "ChatGPT Plus 成品账号",
    tier: "成品账号",
    price: 159,
    originalPrice: 169,
    cta: "立即购买",
    featured: false,
    items: [
      "全新 GPT 账号，已充值一个月 Plus",
      "提供账号密码及邮箱密码",
      "交付后账号永久归您所有",
      "质保承诺，万一封号按天退款",
    ],
  },
];

export const defaultPlan = plans[0];

export function getPlanBySlug(slug?: string | null) {
  return plans.find((plan) => plan.slug === slug) ?? defaultPlan;
}
