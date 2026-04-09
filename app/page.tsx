import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatGPT Plus 充值服务 | GPTShop Pro",
  description:
    "ChatGPT Plus 充值服务，支持微信支付与人工协助处理。首页结构参考高转化 AI 会员充值站点重做，并保留后续扩展 Claude、Gemini、Grok 模块的导航位。",
};

const moduleTabs = [
  { label: "ChatGPT", active: true },
  { label: "Claude", active: false },
  { label: "Gemini", active: false },
  { label: "Grok", active: false },
];

const quickPoints = [
  {
    title: "售后无忧",
    description: "支付异常或处理失败，按规则快速退款处理。",
  },
  {
    title: "极速到账",
    description: "大部分订单在较短时间内完成处理与通知。",
  },
  {
    title: "支付便捷",
    description: "支持微信扫码付款，流程简洁，适合国内用户。",
  },
];

const advantages = [
  {
    title: "充值异常可协助处理",
    description: "下单后如果遇到支付、订阅或状态异常，可继续跟进处理。",
    tone: "emerald",
  },
  {
    title: "无需海外信用卡",
    description: "不需要你自己准备海外卡或反复测试付款环境。",
    tone: "indigo",
  },
  {
    title: "安全流程更清晰",
    description: "把支付、订单信息和后续跟进拆成更容易理解的几个步骤。",
    tone: "violet",
  },
  {
    title: "支持企业采购沟通",
    description: "后续可继续扩展对公、批量采购、发票等企业服务流程。",
    tone: "sky",
  },
];

const flowSteps = [
  {
    step: "步骤 1",
    title: "选择套餐并提交订单",
    description: "进入购买页，填写联系人与 ChatGPT 账号信息。",
  },
  {
    step: "步骤 2",
    title: "扫码完成支付",
    description: "使用页面提供的微信收款码付款，并保留付款截图。",
  },
  {
    step: "步骤 3",
    title: "客服核对并处理",
    description: "根据订单信息与支付状态完成处理，并同步结果。",
  },
];

const testimonials = [
  {
    quote:
      "自己折腾支付方式一直失败，改用这个流程后很快完成了升级，省掉了很多试错成本。",
    name: "Ming Zhao",
    role: "独立开发者",
    badge: "长期续费用户",
    tone: "indigo",
  },
  {
    quote:
      "第一次付款状态没过，后面有人跟进处理，整体响应速度比我预期快不少。",
    name: "温小鹿",
    role: "AI 学习者",
    badge: "客服好评",
    tone: "violet",
  },
  {
    quote:
      "需要临时开通 ChatGPT 做项目，晚上下单后第二天一早就处理好了，效率很高。",
    name: "Ming Jia",
    role: "数据分析师",
    badge: "技术用户",
    tone: "sky",
  },
  {
    quote:
      "我们团队后面准备做批量续费，所以先拿这个版本测试流程，整体沟通比较顺畅。",
    name: "AI 小柏",
    role: "团队负责人",
    badge: "企业客户",
    tone: "emerald",
  },
  {
    quote:
      "主要是想要一个稳定入口，不想每次都重新研究支付环境，这个站的路径比较省心。",
    name: "Kris Luo",
    role: "产品经理",
    badge: "长期续费用户",
    tone: "amber",
  },
  {
    quote:
      "我更关注 GPT 和 Codex 的可用性，支付完之后能继续跟踪处理，这点比单纯卖卡密靠谱。",
    name: "Allen Q",
    role: "工程师",
    badge: "Codex 用户",
    tone: "rose",
  },
];

const faqCategories = ["全部", "代充安全", "充值流程", "企业服务", "Codex"];

const faqs = [
  {
    question: "ChatGPT Plus 代充安全吗？",
    answer:
      "核心是把下单信息、支付方式和后续处理流程说明清楚，避免用户盲目提供不必要的信息。当前版本也把支付与订单信息拆到了单独购买页。",
  },
  {
    question: "没有海外信用卡可以完成充值吗？",
    answer:
      "可以。当前站点主流程就是面向没有海外卡的用户设计，直接在购买页扫码支付即可。",
  },
  {
    question: "支持哪些账号场景？",
    answer:
      "目前首页主打 ChatGPT Plus 充值流程。成品账号、企业采购和其他 AI 会员入口可以继续逐步扩展。",
  },
  {
    question: "企业或团队是否支持批量处理？",
    answer:
      "可以继续扩展为企业版流程，包括批量采购、统一续费、对公沟通与发票信息收集。",
  },
  {
    question: "ChatGPT Plus 和 Pro 如何选择？",
    answer:
      "普通个人使用通常先从 Plus 开始即可；如果你是高频专业用户，再考虑额外咨询 Pro 方案更合适。",
  },
  {
    question: "付款后下一步怎么做？",
    answer:
      "在购买页提交表单并付款后，页面会保留订单信息与二维码，客服可按你提交的信息继续核对处理。",
  },
];

const footerColumns = [
  {
    title: "服务",
    links: [
      { label: "ChatGPT Plus 充值", href: "/purchase?plan=plus-recharge" },
      { label: "ChatGPT 成品账号", href: "/purchase?plan=ready-account" },
      { label: "ChatGPT Pro 咨询", href: "#service-contact" },
    ],
  },
  {
    title: "帮助与支持",
    links: [
      { label: "充值流程", href: "#home-flow" },
      { label: "常见问题", href: "#home-faq" },
      { label: "视频教程", href: "#home-video" },
    ],
  },
];

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="m12 5 7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="2" x2="22" y1="10" y2="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16 2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12l5 5l10 -10"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  const rows = [...items, ...items];

  return (
    <div className="home-marquee-wrap">
      <div className={`home-marquee-track ${reverse ? "is-reverse" : ""}`}>
        {rows.map((item, index) => (
          <article className="home-testimonial-card" key={`${item.name}-${index}`}>
            <div className="home-stars">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <span key={starIndex}>★</span>
              ))}
            </div>
            <blockquote>{item.quote}</blockquote>
            <footer>
              <div className={`home-avatar tone-${item.tone}`}>{item.name[0]}</div>
              <div className="home-testimonial-meta">
                <p>{item.name}</p>
                <span>{item.role}</span>
              </div>
              <span className={`home-testimonial-badge tone-${item.tone}`}>{item.badge}</span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <div className="page-container home-header-inner">
          <a className="home-brand" href="/">
            <span className="home-brand-mark">G</span>
            <span className="home-brand-copy">
              <strong>GPTShop Pro</strong>
              <small>ChatGPT Plus 充值服务</small>
            </span>
          </a>

          <nav className="home-module-nav" aria-label="产品模块">
            {moduleTabs.map((tab) =>
              tab.active ? (
                <a className="home-module-tab is-active" href="/" key={tab.label}>
                  {tab.label}
                </a>
              ) : (
                <span className="home-module-tab is-disabled" key={tab.label}>
                  {tab.label}
                  <small>Soon</small>
                </span>
              ),
            )}
          </nav>

          <div className="home-utility-links">
            <a href="#home-faq">常见问题</a>
            <a href="#home-flow">升级教程</a>
            <a href="/purchase?plan=plus-recharge">查询订单</a>
          </div>
        </div>
      </header>

      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="page-container home-hero-inner">
          <div className="home-hero-copy">
            <h1>
              <span>ChatGPT Plus</span>
              <span>充值服务</span>
            </h1>

            <div className="home-hero-typing">
              <span>支持 GPT‑5 / GPT‑4o / Codex / Projects</span>
            </div>

            <p className="home-hero-description">
              无需海外信用卡、不折腾开卡环境，按当前站点流程完成下单与支付后，即可进入
              ChatGPT Plus 充值处理。导航中已预留 Claude、Gemini、Grok 模块入口，当前先开放
              ChatGPT。
            </p>

            <div className="home-hero-actions">
              <a className="home-primary-cta" href="/purchase?plan=plus-recharge">
                立即充值
                <ArrowRightIcon />
              </a>
              <a className="home-secondary-link" href="#service-contact">
                <span className="home-secondary-badge">Pro</span>
                也支持 ChatGPT Pro 咨询
                <ArrowRightIcon />
              </a>
            </div>

            <div className="home-social-proof">
              <div className="home-proof-users">
                <span className="home-proof-avatar tone-indigo">L</span>
                <span className="home-proof-avatar tone-violet">M</span>
                <span className="home-proof-avatar tone-sky">A</span>
              </div>
              <div className="home-proof-copy">
                <p>
                  已帮助 <strong>1.5万+</strong> 位用户完成充值
                </p>
                <span>
                  当前已开放 ChatGPT 模块，Claude / Gemini / Grok 模块入口已在导航栏保留
                </span>
              </div>
            </div>
          </div>

          <div className="home-quick-points">
            {quickPoints.map((point, index) => (
              <article key={point.title}>
                <span className="home-quick-icon">
                  {index === 0 ? <ShieldIcon /> : index === 1 ? <ZapIcon /> : <CreditCardIcon />}
                </span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </article>
            ))}
          </div>

          <a className="home-scroll-indicator" href="#home-flow">
            <span>下滑查看充值流程</span>
            <div className="home-scroll-line" />
            <div className="home-scroll-circle">↓</div>
          </a>
        </div>
      </section>

      <section className="home-section home-advantages" id="home-advantages">
        <div className="page-container page-container-narrow">
          <div className="home-section-heading">
            <span className="home-section-badge">
              <SparkleIcon />
              核心优势
            </span>
            <h2>
              为什么选择 <span>GPTShop Pro</span>
            </h2>
            <p>保留高转化充值站点的首页结构，但把品牌和后续模块扩展位替换成你自己的版本。</p>
          </div>

          <div className="home-advantage-grid">
            {advantages.map((advantage) => (
              <article className="home-advantage-card" key={advantage.title}>
                <div className={`home-advantage-icon tone-${advantage.tone}`}>
                  {advantage.tone === "emerald" ? (
                    <CheckIcon />
                  ) : advantage.tone === "indigo" ? (
                    <CreditCardIcon />
                  ) : advantage.tone === "violet" ? (
                    <ShieldIcon />
                  ) : (
                    <UsersIcon />
                  )}
                </div>
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-flow" id="home-flow">
        <div className="page-container page-container-narrow">
          <div className="home-flow-shell">
            <div className="home-flow-copy">
              <h2>ChatGPT Plus 充值流程</h2>
              <div className="home-flow-steps">
                {flowSteps.map((item, index) => (
                  <article className="home-flow-step" key={item.title}>
                    <div className={`home-flow-step-badge ${index === 0 ? "is-done" : ""}`}>
                      {index === 0 ? "✓" : index + 1}
                    </div>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="home-flow-preview">
              <div className="home-mock-window is-front">
                <div className="home-mock-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="home-mock-card">
                  <h3>订单信息</h3>
                  <ul>
                    <li>套餐：ChatGPT Plus 充值</li>
                    <li>支付：微信扫码</li>
                    <li>提交：联系人 + 账号邮箱</li>
                  </ul>
                </div>
              </div>

              <div className="home-mock-window is-back">
                <div className="home-mock-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="home-mock-qr">
                  <div className="home-mock-qr-grid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-testimonials" id="home-testimonials">
        <div className="home-section-heading">
          <span className="home-section-badge is-pulsing">
            <span className="home-ping-dot" />
            用户真实反馈
          </span>
          <h2>
            已服务 <span>数万+</span> 用户稳定充值
          </h2>
          <p>这里放的是重写后的示例评价文案，用来保留原站的滚动评价节奏与信任感。</p>
        </div>

        <MarqueeRow items={testimonials.slice(0, 4)} />
        <MarqueeRow items={testimonials.slice(2)} reverse />
      </section>

      <section className="home-section home-faq" id="home-faq">
        <div className="page-container page-container-narrow">
          <div className="home-faq-heading">
            <p>常见问题解答</p>
            <h2>有什么可以帮到你？</h2>
            <span>整理了首页主流程里最容易产生疑问的部分，找不到答案可直接联系右下角客服。</span>
          </div>

          <div className="home-faq-chips">
            {faqCategories.map((category, index) => (
              <span className={`home-faq-chip ${index === 0 ? "is-active" : ""}`} key={category}>
                {category}
              </span>
            ))}
          </div>

          <div className="home-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-video" id="home-video">
        <div className="page-container">
          <div className="home-video-heading">
            <h2>ChatGPT 充值视频教程</h2>
            <p>当前先用教程展示区保留原站的版位和节奏，后续可继续替换成你的真实视频素材。</p>
          </div>

          <div className="home-video-card">
            <div className="home-video-screen">
              <div className="home-video-play">
                <PlayIcon />
              </div>
              <div className="home-video-overlay">
                <strong>完整演示购买到完成支付的全过程</strong>
                <span>后续接入真实 MP4 或 B 站视频地址即可。</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer" id="service-contact">
        <div className="page-container">
          <div className="home-footer-grid">
            <div className="home-footer-brand">
              <a className="home-brand" href="/">
                <span className="home-brand-mark">G</span>
                <span className="home-brand-copy">
                  <strong>GPTShop Pro</strong>
                </span>
              </a>
              <p>提供安全、清晰、可扩展的 ChatGPT Plus 充值前端站点。</p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3>联系我们</h3>
              <div className="home-footer-contact">
                <p>购买页已经接入真实付款二维码，当前可以直接用于下单演示。</p>
                <p>后续如需企业采购、对公沟通或发票信息收集，可以继续扩展流程。</p>
              </div>
            </div>
          </div>

          <div className="home-footer-bottom">
            <p>© 2025-2026 GPTShop Pro. All rights reserved.</p>
            <div>
              <a href="#home-faq">隐私政策</a>
              <a href="#service-contact">服务条款</a>
            </div>
          </div>
        </div>
      </footer>

      <a className="home-floating-service" href="#service-contact" aria-label="联系客服">
        <MessageIcon />
        <span>客服</span>
        <small>!</small>
      </a>
    </main>
  );
}
