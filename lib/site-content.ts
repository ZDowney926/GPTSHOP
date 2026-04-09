export type Highlight = {
  title: string;
  description: string;
};

export type ContentSection = {
  title: string;
  body: string;
  bullets?: string[];
};

export type RelatedLink = {
  label: string;
  href: string;
};

export type SitePage = {
  slug: string;
  metaTitle: string;
  title: string;
  eyebrow: string;
  description: string;
  template: "landing" | "faq" | "guide" | "feedback" | "lookup" | "coupon" | "legal";
  highlights: Highlight[];
  sections: ContentSection[];
  related: RelatedLink[];
  primaryCta?: RelatedLink;
  secondaryCta?: RelatedLink;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  sections: ContentSection[];
};

export const feedbackEntries = [
  {
    name: "Ming Zhao",
    role: "独立开发者",
    quote: "支付环节终于不用自己反复测试环境，整个升级流程清晰很多。",
  },
  {
    name: "温小鹿",
    role: "AI 学习者",
    quote: "有套餐选择页、购买页和说明页之后，理解成本下降不少。",
  },
  {
    name: "Allen Q",
    role: "工程师",
    quote: "最重要的是路径统一，首页、方案页和下单页现在能顺着走下去。",
  },
  {
    name: "AI 小柏",
    role: "团队负责人",
    quote: "如果后面再接企业采购和批量续费，这套结构也能继续扩展。",
  },
];

export const faqEntries = [
  {
    question: "没有海外信用卡可以继续使用吗？",
    answer: "可以。当前站点的主流程就是先选套餐，再进入购买页扫码支付。",
  },
  {
    question: "我已经有 ChatGPT 账号，应该选哪个方案？",
    answer: "如果你要保留自己的历史记录和原账号设置，优先选 Plus 充值。",
  },
  {
    question: "成品账号适合什么情况？",
    answer: "如果你想直接获得可用账号，减少准备时间，可以选成品账号。",
  },
  {
    question: "购买后下一步怎么处理？",
    answer: "购买页会生成订单信息，客服按订单和付款状态继续处理。",
  },
  {
    question: "后面可以扩展企业采购和发票吗？",
    answer: "可以。当前结构已经预留了团队采购、批量续费和企业沟通页面。",
  },
];

export const guideSteps = [
  {
    title: "选择套餐",
    description: "先进入方案选择页，决定是做 Plus 充值还是直接购买成品账号。",
  },
  {
    title: "提交信息",
    description: "进入购买页填写联系人、账号邮箱和备注信息。",
  },
  {
    title: "扫码支付",
    description: "根据页面二维码完成付款，并保留截图以便后续核对。",
  },
  {
    title: "等待处理",
    description: "客服根据订单信息继续处理，并把结果同步给你。",
  },
];

export const sitePages: SitePage[] = [
  {
    slug: "feedback",
    metaTitle: "用户反馈 | GPTShop Pro",
    title: "用户真实反馈",
    eyebrow: "Feedback",
    description: "把购买后的体验、处理效率和交付感受整理成一个独立页面，强化信任感和转化连续性。",
    template: "feedback",
    highlights: [
      { title: "真实场景", description: "聚焦真实使用动机，而不是空泛评价。" },
      { title: "强调路径", description: "反馈内容围绕首页、方案页和购买页的一致体验展开。" },
      { title: "便于扩展", description: "后续可继续增加截图、星级或时间线证明。" },
    ],
    sections: [
      {
        title: "页面目的",
        body: "反馈页主要承接购买决策前后的疑虑，让用户看到别人是如何完成升级并继续使用的。",
      },
      {
        title: "后续可补",
        body: "如果你有真实聊天记录、付款反馈或截图，可以继续替换掉这些占位内容。",
      },
    ],
    related: [
      { label: "返回首页", href: "/" },
      { label: "查看套餐", href: "/plus-price" },
      { label: "常见问题", href: "/faq" },
    ],
    primaryCta: { label: "查看套餐", href: "/plus-price" },
    secondaryCta: { label: "返回首页", href: "/" },
  },
  {
    slug: "order",
    metaTitle: "订单查询 | GPTShop Pro",
    title: "订单查询",
    eyebrow: "Order",
    description: "用于承接用户查单需求，和首页、套餐页保持一致的视觉结构。",
    template: "lookup",
    highlights: [
      { title: "订单号查询", description: "支持后续接入真实订单号或手机号查询逻辑。" },
      { title: "客服兜底", description: "查不到时仍然可以引导联系人工处理。" },
      { title: "流程闭环", description: "避免用户付款后找不到入口。" },
    ],
    sections: [
      {
        title: "当前状态",
        body: "这个页面先把结构搭好，后续可以接数据库、表单服务或者人工核单接口。",
      },
    ],
    related: [
      { label: "套餐选择", href: "/plus-price" },
      { label: "帮助中心", href: "/help" },
      { label: "常见问题", href: "/faq" },
    ],
    primaryCta: { label: "返回套餐页", href: "/plus-price" },
  },
  {
    slug: "coupons",
    metaTitle: "优惠券中心 | GPTShop Pro",
    title: "我的优惠券",
    eyebrow: "Coupons",
    description: "用于承接优惠码、促销券和活动福利的页面入口。",
    template: "coupon",
    highlights: [
      { title: "活动承接", description: "便于以后做限时活动、首单优惠和拉新券。" },
      { title: "账户体系预留", description: "后续可接登录态或联系方式绑定。" },
      { title: "转化补强", description: "优惠信息会显著影响下单动作。" },
    ],
    sections: [
      {
        title: "推荐做法",
        body: "先把优惠券入口保留出来，等你后面真的要做促销活动时，再接具体核销逻辑。",
      },
    ],
    related: [
      { label: "查看价格页", href: "/price" },
      { label: "套餐选择", href: "/plus-price" },
      { label: "Blog", href: "/blog" },
    ],
    primaryCta: { label: "前往套餐选择", href: "/plus-price" },
  },
  {
    slug: "help",
    metaTitle: "帮助中心 | GPTShop Pro",
    title: "使用帮助中心",
    eyebrow: "Help",
    description: "把支付前、支付中、支付后最常见的问题整理成自助排查入口，减少重复沟通成本。",
    template: "landing",
    highlights: [
      { title: "自助排查", description: "先帮用户排除常见问题，再决定是否联系人工。" },
      { title: "流程清晰", description: "把问题拆分到不同阶段，信息更容易理解。" },
      { title: "可继续扩展", description: "后续可加入截图示例、视频或工单入口。" },
    ],
    sections: [
      {
        title: "支付前",
        body: "确认自己要选的是 Plus 充值还是成品账号，避免在购买页反复切换。",
        bullets: ["已有自己的账号，优先看 Plus 充值", "急用且不想准备账号，可看成品账号"],
      },
      {
        title: "支付中",
        body: "提交订单信息后再扫码付款，确保客服联系信息和账号信息能对上。",
        bullets: ["保留付款截图", "确认提交的账号邮箱无误"],
      },
      {
        title: "支付后",
        body: "如需跟进处理，可以带着订单信息和付款截图继续联系支持。",
        bullets: ["优先准备订单信息", "如需排查网络环境，可继续查看 IP 检测页"],
      },
    ],
    related: [
      { label: "订单查询", href: "/order" },
      { label: "IP 环境页", href: "/ip" },
      { label: "常见问题", href: "/faq" },
    ],
    primaryCta: { label: "查看套餐", href: "/plus-price" },
    secondaryCta: { label: "检测 IP 环境", href: "/ip" },
  },
  {
    slug: "faq",
    metaTitle: "常见问题 | GPTShop Pro",
    title: "有什么可以帮到你？",
    eyebrow: "FAQ",
    description: "把购买路径里的高频问题拆出来单独回答，适合作为首页和方案页的支持入口。",
    template: "faq",
    highlights: [
      { title: "减少咨询成本", description: "先回答高频疑问，再进入购买流程。" },
      { title: "适合做 SEO", description: "FAQ 页适合继续扩展成长尾问题集合。" },
      { title: "支持跳转", description: "每个回答都可以继续导向套餐页或帮助中心。" },
    ],
    sections: [
      {
        title: "组织方式",
        body: "当前页面先保留最常见的一组问题，后续你可以继续按支付、交付、账号安全等类别扩充。",
      },
    ],
    related: [
      { label: "帮助中心", href: "/help" },
      { label: "套餐选择", href: "/plus-price" },
      { label: "升级教程", href: "/guide" },
    ],
    primaryCta: { label: "前往套餐选择", href: "/plus-price" },
  },
  {
    slug: "guide",
    metaTitle: "升级教程 | GPTShop Pro",
    title: "升级教程",
    eyebrow: "Guide",
    description: "承接用户想先了解流程再下单的需求，把升级路径、注意事项和下一步动作独立展示。",
    template: "guide",
    highlights: [
      { title: "四步完成", description: "从选套餐到付款后的处理节点全部拆开。" },
      { title: "适合新用户", description: "第一次购买时不需要自己猜流程。" },
      { title: "可接视频", description: "页面已经适合继续加录屏或演示视频。" },
    ],
    sections: [
      {
        title: "适合谁先看",
        body: "如果你还不确定整个购买路径怎么走，先看教程页再去套餐页，会比直接下单更稳。",
      },
    ],
    related: [
      { label: "查看套餐", href: "/plus-price" },
      { label: "常见问题", href: "/faq" },
      { label: "帮助中心", href: "/help" },
    ],
    primaryCta: { label: "现在去选套餐", href: "/plus-price" },
  },
  {
    slug: "gptplus",
    metaTitle: "ChatGPT Plus 页面 | GPTShop Pro",
    title: "ChatGPT Plus 购买",
    eyebrow: "ChatGPT Plus",
    description: "作为独立的 ChatGPT Plus 服务页，承接从首页、博客或搜索入口过来的用户。",
    template: "landing",
    highlights: [
      { title: "保留主路径", description: "统一导向 Plus 充值和成品账号两个购买入口。" },
      { title: "强调功能", description: "聚焦模型能力、Projects 和代码场景。" },
      { title: "适合单页投放", description: "后面能继续扩成单独广告落地页。" },
    ],
    sections: [
      {
        title: "适合场景",
        body: "适合把 ChatGPT Plus 做成一个独立服务入口，单独承接搜索流量和外部推广。",
        bullets: ["个人使用", "编程与代码解释", "日常提效和内容创作"],
      },
      {
        title: "推荐路径",
        body: "先去套餐页确认是代充值还是成品账号，再进入购买页填写信息。",
      },
    ],
    related: [
      { label: "套餐选择", href: "/plus-price" },
      { label: "价格总览", href: "/price" },
      { label: "ChatGPT Pro", href: "/gptpro" },
    ],
    primaryCta: { label: "进入方案选择", href: "/plus-price" },
    secondaryCta: { label: "查看价格总览", href: "/price" },
  },
  {
    slug: "team",
    metaTitle: "团队方案页面 | GPTShop Pro",
    title: "团队与企业采购方案",
    eyebrow: "Team",
    description: "为后续企业沟通、团队续费和对公采购预留的服务页面。",
    template: "landing",
    highlights: [
      { title: "企业入口", description: "把个人购买页和企业采购页区分开。" },
      { title: "批量续费", description: "适合后续接多账号统一管理与续费。" },
      { title: "对公沟通", description: "便于继续增加发票、合同和采购说明。" },
    ],
    sections: [
      {
        title: "为什么单独做团队页",
        body: "企业用户关心的不是单次下单，而是稳定供给、沟通效率、结算方式和后续管理。",
      },
      {
        title: "后续扩展点",
        body: "可以继续加账号数量、采购周期、预算区间和对公需求收集表单。",
      },
    ],
    related: [
      { label: "ChatGPT Plus", href: "/gptplus" },
      { label: "帮助中心", href: "/help" },
      { label: "订单查询", href: "/order" },
    ],
    primaryCta: { label: "联系前先看套餐", href: "/plus-price" },
  },
  {
    slug: "gptpro",
    metaTitle: "ChatGPT Pro 页面 | GPTShop Pro",
    title: "ChatGPT Pro 服务介绍",
    eyebrow: "ChatGPT Pro",
    description: "为更高频、更重度的使用场景预留单独页面，避免和 Plus 页面混在一起。",
    template: "landing",
    highlights: [
      { title: "与 Plus 区分", description: "独立说明适合什么样的用户升级到更高阶方案。" },
      { title: "承接咨询", description: "后续可加表单收集使用量和预算。" },
      { title: "品牌延伸", description: "丰富站点层级，让导航和页面结构更完整。" },
    ],
    sections: [
      {
        title: "适合谁",
        body: "如果你是高频使用者、长期依赖代码和研究能力，才值得进一步评估更高阶方案。",
      },
      {
        title: "当前建议",
        body: "大多数个人用户仍然先从 Plus 开始更合理，除非你已经非常明确自己的用量和收益。",
      },
    ],
    related: [
      { label: "ChatGPT Plus", href: "/gptplus" },
      { label: "套餐选择", href: "/plus-price" },
      { label: "常见问题", href: "/faq" },
    ],
    primaryCta: { label: "先看 Plus 套餐", href: "/plus-price" },
  },
  {
    slug: "grok",
    metaTitle: "Grok 页面 | GPTShop Pro",
    title: "xAI Grok 服务页",
    eyebrow: "Grok",
    description: "保留与 Grok 相关的单独入口，方便未来继续扩展 xAI 订阅与账号方案。",
    template: "landing",
    highlights: [
      { title: "路由占位", description: "先把页面和导航体系搭起来，避免后面再改结构。" },
      { title: "便于扩展", description: "后续可加 SuperGrok 或其他方案说明。" },
      { title: "站点完整", description: "和首页模块导航形成对应关系。" },
    ],
    sections: [
      {
        title: "当前定位",
        body: "这一页先作为服务入口和页面占位，等你后面真的要做 Grok 相关产品时再替换成正式内容。",
      },
    ],
    related: [
      { label: "Gemini 页面", href: "/gemini-pro" },
      { label: "ChatGPT Plus", href: "/gptplus" },
      { label: "首页", href: "/" },
    ],
    primaryCta: { label: "先看 ChatGPT 主路径", href: "/plus-price" },
  },
  {
    slug: "gemini-pro",
    metaTitle: "Gemini 页面 | GPTShop Pro",
    title: "Google Gemini 页面",
    eyebrow: "Gemini",
    description: "保留 Gemini 的服务层级和独立落地页，后面做成正式模块时不需要再重构。",
    template: "landing",
    highlights: [
      { title: "模块预留", description: "和首页导航中的 Gemini 对应。" },
      { title: "便于扩品", description: "后续可以扩成充值、账号或对比页。" },
      { title: "统一设计", description: "继续沿用整站统一的内容页模板。" },
    ],
    sections: [
      {
        title: "当前阶段",
        body: "这页先做成可访问的结构页，后续你决定要不要真正上线 Gemini 产品时，再替换具体内容。",
      },
    ],
    related: [
      { label: "Grok 页面", href: "/grok" },
      { label: "ChatGPT Plus", href: "/gptplus" },
      { label: "首页", href: "/" },
    ],
    primaryCta: { label: "回到主购买路径", href: "/plus-price" },
  },
  {
    slug: "free-comet",
    metaTitle: "活动页面 | GPTShop Pro",
    title: "活动福利页",
    eyebrow: "Campaign",
    description: "用于承接活动专题、外部合作或福利赠送类页面，先做成模板占位。",
    template: "landing",
    highlights: [
      { title: "活动承接", description: "适合未来做限时福利、合作推广和工具推荐。" },
      { title: "支持投放", description: "单独路径便于挂广告或社媒入口。" },
      { title: "不影响主站", description: "专题页不会打乱主购买流程。" },
    ],
    sections: [
      {
        title: "如何使用",
        body: "可以把这页作为一个活动落地页模板，后面替换标题、福利说明和领取步骤即可。",
      },
    ],
    related: [
      { label: "优惠券中心", href: "/coupons" },
      { label: "Blog", href: "/blog" },
      { label: "首页", href: "/" },
    ],
    primaryCta: { label: "查看当前套餐", href: "/plus-price" },
  },
  {
    slug: "ip",
    metaTitle: "IP 环境检测说明 | GPTShop Pro",
    title: "检测你的 IP 环境是否稳定",
    eyebrow: "IP Check",
    description: "把网络环境、风险控制和使用稳定性相关的信息抽成独立页面，后续可接检测工具。",
    template: "landing",
    highlights: [
      { title: "风控说明", description: "帮助用户理解为什么不同网络环境会影响使用体验。" },
      { title: "工具预留", description: "后续可继续接入检测脚本或第三方接口。" },
      { title: "减少误判", description: "把支付问题和网络环境问题拆开说明。" },
    ],
    sections: [
      {
        title: "当前可做什么",
        body: "现在先用它做说明页，告诉用户哪些情况可能是网络或环境问题，而不是购买链路本身的问题。",
        bullets: ["网络节点不稳定", "地区切换频繁", "共享环境带来的风控影响"],
      },
      {
        title: "后续升级方向",
        body: "如果你之后要做更强的工具化页面，可以继续加入检测按钮、评分卡和结果解释。",
      },
    ],
    related: [
      { label: "帮助中心", href: "/help" },
      { label: "Blog 风控文章", href: "/blog" },
      { label: "返回首页", href: "/" },
    ],
    primaryCta: { label: "先完成主购买流程", href: "/plus-price" },
  },
  {
    slug: "privacy",
    metaTitle: "隐私政策 | GPTShop Pro",
    title: "隐私政策",
    eyebrow: "Privacy",
    description: "保留隐私和数据使用说明，是完整商业站点的基础页面之一。",
    template: "legal",
    highlights: [
      { title: "基础合规", description: "说明站点会收集哪些必要信息。" },
      { title: "清晰边界", description: "说明数据只用于下单、支付和客服联系。" },
      { title: "可持续补充", description: "后面可继续加入 Cookie、分析工具和第三方服务说明。" },
    ],
    sections: [
      {
        title: "信息收集",
        body: "为了完成下单、客服沟通和订单处理，站点可能会收集联系人、联系方式、账号邮箱和必要的订单信息。",
      },
      {
        title: "信息用途",
        body: "这些信息仅用于订单确认、支付核对、售后支持和页面服务优化，不会超出必要范围使用。",
      },
      {
        title: "第三方服务",
        body: "如果后续接入部署平台、统计工具、支付工具或表单服务，应在本页继续补充第三方服务说明。",
      },
    ],
    related: [
      { label: "服务条款", href: "/terms" },
      { label: "返回首页", href: "/" },
      { label: "帮助中心", href: "/help" },
    ],
  },
  {
    slug: "terms",
    metaTitle: "服务条款 | GPTShop Pro",
    title: "服务条款",
    eyebrow: "Terms",
    description: "保留服务范围、售后边界和使用约定，是支付型站点的基础页面。",
    template: "legal",
    highlights: [
      { title: "服务说明", description: "说明页面提供的是信息展示、下单和客服处理入口。" },
      { title: "售后边界", description: "明确退款、处理时间和异常情况沟通方式。" },
      { title: "后续可细化", description: "真正上线商业版本时，应继续补充更完整条款。" },
    ],
    sections: [
      {
        title: "服务范围",
        body: "站点提供套餐信息展示、购买信息收集、支付指引和后续订单处理沟通等服务。",
      },
      {
        title: "订单处理",
        body: "用户需确保提交的联系人与账号信息准确无误，以便继续核对处理。",
      },
      {
        title: "异常情况",
        body: "如遇支付异常、账号异常或信息错误，应先通过站内保留的信息联系支持继续处理。",
      },
    ],
    related: [
      { label: "隐私政策", href: "/privacy" },
      { label: "订单查询", href: "/order" },
      { label: "返回首页", href: "/" },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "gpt-5-4-release-announcement",
    title: "GPT-5.4 上线后的使用价值该怎么判断",
    metaTitle: "GPT-5.4 上线观察 | GPTShop Pro Blog",
    excerpt: "从普通用户视角拆解模型更新对购买决策和使用体验的影响。",
    category: "模型更新",
    publishedAt: "2026-03-06",
    sections: [
      {
        title: "先看对你有没有用",
        body: "模型升级不是只看参数，而是看是否真的提升了你每天最常用的场景，例如代码、写作和推理效率。",
      },
      {
        title: "付费决策怎么做",
        body: "如果你还没有稳定高频使用路径，先用 Plus 验证自己的需求，比一开始就追更高阶方案更稳。",
      },
      {
        title: "站内关联",
        body: "这种文章最适合导向 ChatGPT Plus 页面或价格总览页，帮助用户把信息阅读和购买决策接起来。",
      },
    ],
  },
  {
    slug: "gpt-degradation-detection",
    title: "如何判断自己的 GPT 使用状态是否异常",
    metaTitle: "GPT 使用状态检测 | GPTShop Pro Blog",
    excerpt: "把用户最常见的“是不是被限制了”疑问拆成更容易判断的几个信号。",
    category: "使用诊断",
    publishedAt: "2026-01-15",
    sections: [
      {
        title: "先区分问题类型",
        body: "很多用户会把网络问题、支付问题和模型表现问题混在一起判断，先拆分类别很重要。",
      },
      {
        title: "观察维度",
        body: "可以从响应速度、功能入口、模型可见性和账号状态几个方面判断。",
      },
      {
        title: "处理建议",
        body: "如果怀疑是网络环境问题，可以先看 IP 页；如果是购买链路问题，再回到帮助中心排查。",
      },
    ],
  },
  {
    slug: "gpt-degrade",
    title: "当体验下降时，应该先查购买链路还是网络环境",
    metaTitle: "体验下降排查思路 | GPTShop Pro Blog",
    excerpt: "从业务流程角度解释，什么情况该找客服，什么情况该先查自己的环境。",
    category: "使用诊断",
    publishedAt: "2026-01-15",
    sections: [
      {
        title: "购买链路问题",
        body: "如果是套餐没选对、订单信息错误或支付后状态没同步，优先从站内订单和客服流程查起。",
      },
      {
        title: "环境链路问题",
        body: "如果购买流程已经完成，但体验不稳定，优先看网络节点和地区切换问题。",
      },
      {
        title: "为什么要拆开看",
        body: "这样可以避免把所有问题都归到客服处理上，减小沟通成本。",
      },
    ],
  },
  {
    slug: "gpt-ip-quality-detection",
    title: "检测 IP 质量时最值得先看哪些指标",
    metaTitle: "IP 质量检测思路 | GPTShop Pro Blog",
    excerpt: "把复杂的 IP 环境问题转成普通用户也能理解的检查步骤。",
    category: "网络环境",
    publishedAt: "2026-01-15",
    sections: [
      {
        title: "先看稳定性",
        body: "网络是否频繁切换、是否存在明显共享特征，通常比单点测速更重要。",
      },
      {
        title: "再看地区与一致性",
        body: "账号长期使用的地区、节点来源和行为模式需要尽量保持一致。",
      },
      {
        title: "站点如何承接",
        body: "这类文章很适合导向帮助中心和 IP 说明页，形成内容到工具的过渡。",
      },
    ],
  },
  {
    slug: "gpt-ip-risk-control-mechanism",
    title: "为什么网络环境会影响使用稳定性",
    metaTitle: "网络环境与风控 | GPTShop Pro Blog",
    excerpt: "从更通俗的角度解释网络环境对模型使用体验的影响。",
    category: "网络环境",
    publishedAt: "2026-01-15",
    sections: [
      {
        title: "核心逻辑",
        body: "服务方会通过环境、地区和行为信号判断风险，这也是为什么有些节点体验更容易波动。",
      },
      {
        title: "对普通用户意味着什么",
        body: "不用理解全部技术细节，只需要知道保持环境稳定，比反复切换更重要。",
      },
      {
        title: "实际落地",
        body: "站内可以把这些信息放到帮助中心、IP 页和 FAQ 中，减少重复解释。",
      },
    ],
  },
  {
    slug: "gpt-residential-ip-guide",
    title: "家宽环境为什么更适合长期稳定使用",
    metaTitle: "稳定环境说明 | GPTShop Pro Blog",
    excerpt: "解释为什么长期一致的环境通常更适合持续使用在线 AI 工具。",
    category: "网络环境",
    publishedAt: "2026-01-15",
    sections: [
      {
        title: "长期一致性",
        body: "长期稳定的使用环境更容易形成一致的账号行为特征，这通常比临时切换更可控。",
      },
      {
        title: "不要盲目追求复杂方案",
        body: "对普通用户来说，稳定、简单、能长期维护的方案更重要。",
      },
      {
        title: "页面组合建议",
        body: "这类文章可以和帮助中心、FAQ、IP 页形成内容组合，增加整站完整度。",
      },
    ],
  },
  {
    slug: "gpt-image-1.5-release",
    title: "图像能力更新之后，普通用户最需要关心什么",
    metaTitle: "图像能力更新观察 | GPTShop Pro Blog",
    excerpt: "不从技术发布会角度，而从购买和使用角度看图像能力更新的实际意义。",
    category: "模型更新",
    publishedAt: "2025-12-17",
    sections: [
      {
        title: "能力更新并不等于人人都需要",
        body: "很多功能更新更适合特定用户，真正重要的是它是否进入了你的日常工作流。",
      },
      {
        title: "如何放到站内内容里",
        body: "可以用文章说明新能力，再把用户导向更适合的套餐或购买路径。",
      },
      {
        title: "避免信息堆积",
        body: "博客文章最好解决一个明确问题，而不是堆所有更新说明。",
      },
    ],
  },
  {
    slug: "gpt-5.2-release-announcement",
    title: "新版本上线时，价格页和服务页应该怎么配合更新",
    metaTitle: "版本更新后的页面协同 | GPTShop Pro Blog",
    excerpt: "从站点运营角度看模型更新后该改哪些页面，而不是只发一篇新闻。",
    category: "站点运营",
    publishedAt: "2025-12-12",
    sections: [
      {
        title: "优先改首页和价格页",
        body: "用户最先看到的页面，应该先同步主要能力变化和购买建议。",
      },
      {
        title: "博客的作用",
        body: "博客更适合承接深度解释，而不是替代服务页本身。",
      },
      {
        title: "内容和购买闭环",
        body: "一篇文章至少应该能把用户导向相关服务页、FAQ 或帮助中心。",
      },
    ],
  },
  {
    slug: "chatgpt-plus-upgrade-guide",
    title: "国内用户在升级 ChatGPT Plus 前，最值得先搞清楚的 3 件事",
    metaTitle: "ChatGPT Plus 升级指南 | GPTShop Pro Blog",
    excerpt: "把升级路径、套餐区别和支付逻辑整理成一篇更适合新用户阅读的说明文。",
    category: "购买指南",
    publishedAt: "2025-11-22",
    sections: [
      {
        title: "先分清购买类型",
        body: "你是升级自己的账号，还是想直接拿到成品账号，这一步会决定后续整个路径。",
      },
      {
        title: "再确认支付路径",
        body: "先选套餐，再进入购买页填写订单信息，会比直接跳付款更清晰。",
      },
      {
        title: "最后才是细节优化",
        body: "FAQ、帮助中心和订单查询页都属于降低操作焦虑的补充页面。",
      },
    ],
  },
];

export function getSitePageBySlug(slug: string) {
  return sitePages.find((page) => page.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
