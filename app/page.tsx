import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatGPT Plus 方案选择 | 代充值与成品账号对比 | GPTShop Pro",
  description:
    "对比 ChatGPT Plus 代充值与 Plus 成品账号两种方案，了解价格、交付方式与适用场景，快速选到合适的购买路径。",
};

const productCards = [
  {
    name: "ChatGPT Plus 充值",
    badge: "充值 Plus",
    price: 179,
    originalPrice: 189,
    description: "正规官方通道充值，个人版 Plus 一键升级，不成功全额退款",
    tags: ["给你充值", "无需账密"],
    items: [
      "访问 GPT-5 等最新模型能力",
      "支持 Codex CLI、App 端等代码理解与生成",
      "Projects 项目能力",
      "无需账密，保障信息安全",
    ],
    href: "/purchase?plan=plus-recharge",
    cta: "立即升级",
    featured: true,
    variant: "indigo",
  },
  {
    name: "ChatGPT Plus 成品账号",
    badge: "成品账号",
    price: 159,
    originalPrice: 169,
    description: "全新独享账号，可改密码，已充值一月 Plus",
    tags: ["全新账号", "永久归属", "质保退款"],
    items: [
      "全新 GPT 账号，已充值一个月 Plus",
      "提供账号密码及邮箱密码",
      "交付后账号永久归您所有",
      "质保承诺，万一封号按天退款",
    ],
    href: "/purchase?plan=ready-account",
    cta: "立即购买",
    featured: false,
    variant: "green",
  },
  {
    name: "200$ ChatGPT Pro 充值",
    badge: "进阶需求",
    priceLabel: "价格需咨询客服",
    description: "ChatGPT Pro 价格较高，暂未上线自助，请联系客服充值，速度很快",
    tags: ["高级模型", "更高配额"],
    items: [
      "更高级的 AI 模型能力",
      "更高的使用配额和响应速度",
      "优先访问新功能和特性",
      "需联系客服进行定制充值",
    ],
    href: "#footer-contact",
    cta: "咨询客服",
    featured: false,
    variant: "slate",
  },
];

const compareRows = [
  ["账号归属", "用你自己的账号", "给你一个全新账号"],
  ["需要账密吗", "不需要，安全放心", "交付账密给你（可修改，完全独享）"],
  ["Plus 功能", "完全相同", "完全相同"],
  ["历史记录", "保留原有记录", "全新空白账号"],
  ["续费方式", "原账号继续充值", "支持续费，下次下单充值即可"],
];

const footerColumns = [
  {
    title: "服务",
    links: [
      { label: "ChatGPT Plus 代充", href: "/purchase?plan=plus-recharge" },
      { label: "ChatGPT Plus 成品号", href: "/purchase?plan=ready-account" },
      { label: "ChatGPT Pro 咨询", href: "#footer-contact" },
    ],
  },
  {
    title: "帮助与支持",
    links: [
      { label: "方案对比", href: "#compare-table" },
      { label: "下单购买", href: "/purchase?plan=ready-account" },
      { label: "售后说明", href: "#footer-contact" },
    ],
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

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

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m6 9 6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M20 2v4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 4h-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="4" cy="20" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
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

export default function Home() {
  return (
    <main className="pricing-page">
      <div className="announcement-bar">
        <div className="page-container">
          <a className="announcement-link" href="#pricing-cards">
            <span className="announcement-icon">
              <SparklesIcon />
            </span>
            <span className="announcement-text">
              GPT-5.4 已于 2026 年 3 月 6 日发布，点击查看完整解读与开通说明。
            </span>
            <span className="announcement-action">
              查看 GPT-5.4 解读
              <ArrowRightIcon />
            </span>
          </a>
        </div>
      </div>

      <header className="pricing-header">
        <div className="page-container pricing-header-inner">
          <a className="pricing-brand" href="/">
            <span className="pricing-brand-mark">G</span>
            <span className="pricing-brand-copy">
              <strong>GETGPT Pro</strong>
              <small>ChatGPT Plus 充值服务</small>
            </span>
          </a>

          <nav className="pricing-nav" aria-label="主导航">
            <a href="/">首页</a>
            <a href="#compare-table">方案对比</a>
            <a href="/purchase?plan=plus-recharge">升级教程</a>
            <a href="/purchase?plan=ready-account">购买入口</a>
            <a href="#footer-contact">联系客服</a>
          </nav>

          <a className="pricing-order-link" href="/purchase?plan=ready-account">
            查询订单
          </a>
        </div>
      </header>

      <section className="pricing-hero">
        <div className="page-container">
          <div className="pricing-hero-copy">
            <a className="pricing-back-link" href="#pricing-cards">
              <span className="pricing-back-arrow">‹</span>
              返回套餐选择
            </a>
            <h1>选择您的 ChatGPT 方案</h1>
            <p className="pricing-hero-subtitle">
              Plus 代充值 或 Plus 成品账号，两种方式任您选择
            </p>
            <p className="pricing-hero-caption">
              都是个人版 Plus，功能完全相同，根据您的需求选择
            </p>
          </div>
        </div>
      </section>

      <section className="pricing-products" id="pricing-cards">
        <div className="page-container page-container-narrow">
          <a className="compare-jump" href="#compare-table">
            <span className="compare-jump-label">
              <span className="compare-jump-emoji">🔍</span>
              不确定选充值还是成品号？
            </span>
            <span className="compare-jump-action">
              滑到下方看对比
              <span className="compare-jump-arrow">↓</span>
            </span>
          </a>

          <div className="product-grid">
            {productCards.map((card) => (
              <article
                className={[
                  "product-card",
                  `product-card-${card.variant}`,
                  card.featured ? "product-card-featured" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={card.name}
              >
                {card.featured ? <span className="product-card-ribbon">推荐</span> : null}

                <div className="product-card-head">
                  <h2>{card.name}</h2>
                  <span className={`product-badge product-badge-${card.variant}`}>{card.badge}</span>
                </div>

                {"price" in card ? (
                  <div className="product-price-row">
                    <strong className="product-price">¥{card.price}</strong>
                    <div className="product-price-meta">
                      <span className="product-price-original">¥{card.originalPrice}</span>
                      <span>/ 月</span>
                    </div>
                  </div>
                ) : (
                  <div className="product-price-row product-price-row-text">
                    <strong className="product-price-note">{card.priceLabel}</strong>
                  </div>
                )}

                <p className="product-description">{card.description}</p>

                <div className="product-tags">
                  {card.tags.map((tag) => (
                    <span className={`product-tag product-tag-${card.variant}`} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <ul className="product-features">
                  {card.items.map((item) => (
                    <li key={item}>
                      <span className={`feature-icon feature-icon-${card.variant}`}>
                        <CheckIcon />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  className={[
                    "product-button",
                    card.variant === "slate" ? "product-button-outline" : "product-button-solid",
                  ].join(" ")}
                  href={card.href}
                >
                  {card.cta}
                </a>
              </article>
            ))}
          </div>

          <div className="compare-table-section" id="compare-table">
            <div className="compare-table-title">
              <span className="compare-line" />
              <span className="compare-table-title-text">
                <ChevronDownIcon />
                充值 vs 成品号 · 一图看懂
              </span>
              <span className="compare-line" />
            </div>

            <div className="compare-table">
              <div className="compare-table-head compare-table-row">
                <div />
                <div className="compare-table-head-recharge">充值</div>
                <div className="compare-table-head-account">成品号</div>
              </div>

              {compareRows.map((row, index) => (
                <div className={`compare-table-row ${index % 2 === 0 ? "is-alt" : ""}`} key={row[0]}>
                  <div className="compare-table-label">{row[0]}</div>
                  <div>{row[1]}</div>
                  <div>{row[2]}</div>
                </div>
              ))}
            </div>

            <div className="compare-notes">
              <div className="compare-note compare-note-amber">
                <span>💡</span>
                <p>
                  两种方式功能<strong>完全一致</strong>，都是个人版 Plus
                </p>
              </div>
              <div className="compare-note compare-note-blue">
                <span>💰</span>
                <p>
                  价格差异：自动化充值成本更高，成品号<strong>提前人工备货成本更低</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pricing-footer">
        <div className="page-container">
          <div className="pricing-footer-grid">
            <div className="pricing-footer-brand">
              <a className="pricing-brand pricing-brand-footer" href="/">
                <span className="pricing-brand-mark">G</span>
                <span className="pricing-brand-copy">
                  <strong>GETGPT Pro</strong>
                </span>
              </a>
              <p>提供安全、极速的 ChatGPT Plus 充值服务</p>
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

            <div id="footer-contact">
              <h3>联系我们</h3>
              <div className="footer-contact-copy">
                <p>下单后如需帮助，可直接进入购买页完成支付与信息提交。</p>
                <p>当前站点已接入真实付款二维码，购买页可直接扫码。</p>
              </div>
            </div>
          </div>

          <div className="pricing-footer-bottom">
            <p>© 2025-2026 GETGPT Pro. All rights reserved.</p>
            <div className="pricing-footer-legal">
              <a href="#compare-table">隐私政策</a>
              <a href="#footer-contact">服务条款</a>
            </div>
          </div>
        </div>
      </footer>

      <a className="floating-service" href="#footer-contact" aria-label="联系客服">
        <span className="floating-service-icon">
          <MessageIcon />
        </span>
        <span className="floating-service-text">客服</span>
        <span className="floating-service-dot">!</span>
      </a>
    </main>
  );
}
