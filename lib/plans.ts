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
    slug: "starter",
    name: "首次开通协助",
    tier: "基础版",
    price: 128,
    cta: "立即充值",
    featured: false,
    items: ["适合首次尝试订阅", "开通路径说明", "一次状态跟进", "标准工单响应"],
  },
  {
    slug: "plus-complete",
    name: "Plus 完整开通",
    tier: "推荐",
    price: 159,
    originalPrice: 169,
    cta: "立即充值",
    featured: true,
    items: ["代处理关键开通环节", "异常状态排查", "续费节点提醒", "优先响应"],
  },
  {
    slug: "advanced",
    name: "开通 + 续费协助",
    tier: "进阶版",
    price: 268,
    cta: "立即充值",
    featured: false,
    items: ["适合长期使用者", "包含后续续费协助", "双次状态跟进", "更高优先级支持"],
  },
];

export const defaultPlan = plans[1];

export function getPlanBySlug(slug?: string | null) {
  return plans.find((plan) => plan.slug === slug) ?? defaultPlan;
}
