import type { Metadata } from "next";
import Link from "next/link";
import { plans } from "@/lib/plans";

export const metadata: Metadata = {
  title: "ChatGPT Plus 方案选择 | GPTShop Pro",
  description: "对比 ChatGPT Plus 充值与成品账号两种方案，先选择套餐，再进入填写信息和支付页面。",
};

const compareRows = [
  {
    label: "开通方式",
    recharge: "人工代充值",
    account: "直接交付可用账号",
  },
  {
    label: "适合人群",
    recharge: "已有自己的 ChatGPT 账号",
    account: "想直接拿到可用账号",
  },
  {
    label: "是否需要海外卡",
    recharge: "不需要",
    account: "不需要",
  },
  {
    label: "交付内容",
    recharge: "你的原账号升级为 Plus",
    account: "提供新账号与邮箱信息",
  },
  {
    label: "使用延续性",
    recharge: "保留原账号历史记录",
    account: "从新账号开始使用",
  },
  {
    label: "售后处理",
    recharge: "按订单继续跟进处理",
    account: "交付后提供基础质保",
  },
];

const footerColumns = [
  {
    title: "方案选择",
    links: [
      { label: "ChatGPT Plus 充值", href: "#plan-plus-recharge" },
      { label: "ChatGPT 成品账号", href: "#plan-ready-account" },
      { label: "方案对比", href: "#plan-compare" },
    ],
  },
  {
    title: "帮助中心",
    links: [
      { label: "返回首页", href: "/" },
      { label: "常见问题", href: "/faq" },
      { label: "升级流程", href: "/guide" },
      { label: "订单查询", href: "/order" },
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

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 10h8M8 14h5M6 20l-2 2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function PlusPricePage() {
  const rechargePlan = plans[0];
  const readyAccountPlan = plans[1];

  return (
    <main className="pricing-page">
      <header className="pricing-header">
        <div className="page-container pricing-header-inner">
          <Link className="pricing-brand" href="/">
            <span className="pricing-brand-mark">G</span>
            <span className="pricing-brand-copy">
              <strong>GPTShop Pro</strong>
              <small>ChatGPT Plus 充值服务</small>
            </span>
          </Link>

          <nav className="pricing-nav" aria-label="套餐页导航">
            <Link href="/">首页</Link>
            <Link href="/faq">常见问题</Link>
            <Link href="/guide">升级教程</Link>
            <Link href="/order">查询订单</Link>
          </nav>

          <Link className="pricing-order-link" href="#plan-compare">
            方案对比
          </Link>
        </div>
      </header>

      <section className="pricing-hero">
        <div className="page-container">
          <div className="pricing-hero-copy">
            <Link className="pricing-back-link" href="/">
              <span className="pricing-back-arrow">←</span>
              返回首页
            </Link>
            <h1>选择您的 ChatGPT 方案</h1>
            <p className="pricing-hero-subtitle">Plus 代充值 或 Plus 成品账号，两种方式任您选择</p>
            <p className="pricing-hero-caption">都是个人版 Plus，功能完全相同，根据您的需求选择</p>
          </div>
        </div>
      </section>

      <section className="pricing-products">
        <div className="page-container page-container-narrow">
          <Link className="compare-jump" href="#plan-compare">
            <span className="compare-jump-label">
              <span className="compare-jump-emoji">↕</span>
              下滑查看两种方案的详细对比
            </span>
            <span className="compare-jump-action">
              继续查看
              <span className="compare-jump-arrow">↓</span>
            </span>
          </Link>

          <div className="product-grid product-grid-two">
            <article className="product-card product-card-featured" id="plan-plus-recharge">
              <span className="product-card-ribbon">推荐</span>
              <div className="product-card-head">
                <h2>{rechargePlan.name}</h2>
                <span className="product-badge product-badge-indigo">{rechargePlan.tier}</span>
              </div>

              <div className="product-price-row">
                <strong className="product-price">¥{rechargePlan.price}</strong>
                <div className="product-price-meta">
                  {rechargePlan.originalPrice ? (
                    <span className="product-price-original">¥{rechargePlan.originalPrice}</span>
                  ) : null}
                  <span>/ 月</span>
                </div>
              </div>

              <div className="product-price-row-text">
                <div className="product-price-note">正规官方通道充值，个人版 Plus 一键升级</div>
                <p className="product-description">
                  适合你已经有自己的 ChatGPT 账号，只需要完成会员升级的场景。不需要账密，不成功按规则处理。
                </p>
              </div>

              <div className="product-tags">
                <span className="product-tag product-tag-indigo">给你充值</span>
                <span className="product-tag product-tag-indigo">无需账密</span>
              </div>

              <ul className="product-features">
                {rechargePlan.items.map((item) => (
                  <li key={item}>
                    <span className="feature-icon feature-icon-indigo">
                      <CheckIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link className="product-button product-button-solid" href={`/purchase?plan=${rechargePlan.slug}`}>
                {rechargePlan.cta}
              </Link>
            </article>

            <article className="product-card product-card-green" id="plan-ready-account">
              <div className="product-card-head">
                <h2>{readyAccountPlan.name}</h2>
                <span className="product-badge product-badge-green">{readyAccountPlan.tier}</span>
              </div>

              <div className="product-price-row">
                <strong className="product-price">¥{readyAccountPlan.price}</strong>
                <div className="product-price-meta">
                  {readyAccountPlan.originalPrice ? (
                    <span className="product-price-original">¥{readyAccountPlan.originalPrice}</span>
                  ) : null}
                  <span>/ 份</span>
                </div>
              </div>

              <div className="product-price-row-text">
                <div className="product-price-note">开箱即用，交付后可直接登录使用</div>
                <p className="product-description">
                  适合不想自己准备账号、希望直接拿到成品 Plus 账号的场景。交付账号密码和邮箱信息，省去准备步骤。
                </p>
              </div>

              <div className="product-tags">
                <span className="product-tag product-tag-green">直接交付</span>
                <span className="product-tag product-tag-green">开箱即用</span>
              </div>

              <ul className="product-features">
                {readyAccountPlan.items.map((item) => (
                  <li key={item}>
                    <span className="feature-icon feature-icon-green">
                      <CheckIcon />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link className="product-button product-button-outline" href={`/purchase?plan=${readyAccountPlan.slug}`}>
                {readyAccountPlan.cta}
              </Link>
            </article>
          </div>

          <section className="compare-table-section" id="plan-compare">
            <div className="compare-table-title">
              <span className="compare-line" />
              <div className="compare-table-title-text">
                <MessageIcon />
                两种方案详细对比
              </div>
              <span className="compare-line" />
            </div>

            <div className="compare-table">
              <div className="compare-table-row compare-table-head">
                <div className="compare-table-label">对比维度</div>
                <div className="compare-table-head-recharge">Plus 充值</div>
                <div className="compare-table-head-account">成品账号</div>
              </div>

              {compareRows.map((row, index) => (
                <div
                  className={`compare-table-row ${index % 2 === 1 ? "is-alt" : ""}`}
                  key={row.label}
                >
                  <div className="compare-table-label">{row.label}</div>
                  <div>{row.recharge}</div>
                  <div>{row.account}</div>
                </div>
              ))}
            </div>

            <div className="compare-notes">
              <div className="compare-note compare-note-amber">
                <span>💡</span>
                <p>
                  <strong>如果你有自己的账号</strong>，优先选 Plus 充值，后续使用更连贯，历史记录和已有设置都能保留。
                </p>
              </div>
              <div className="compare-note compare-note-blue">
                <span>📦</span>
                <p>
                  <strong>如果你想一步到位</strong>，直接选成品账号，适合急用或不想自己准备账号的情况。
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <footer className="pricing-footer" id="pricing-footer">
        <div className="page-container page-container-narrow">
          <div className="pricing-footer-grid">
            <div className="pricing-footer-brand">
              <Link className="pricing-brand pricing-brand-footer" href="/">
                <span className="pricing-brand-mark">G</span>
                <span className="pricing-brand-copy">
                  <strong>GPTShop Pro</strong>
                  <small>ChatGPT Plus 充值服务</small>
                </span>
              </Link>
              <p>先选择方案，再进入填写信息与支付步骤。这样首页和购买页之间的转化路径会更接近原站结构。</p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3>客服与下单</h3>
              <div className="footer-contact-copy">
                <span>当前购买流程支持微信扫码支付。</span>
                <span>如需继续处理订单，请先选择方案后进入购买页。</span>
                <span>右下角悬浮按钮保留为客服入口位置。</span>
              </div>
            </div>
          </div>

            <div className="pricing-footer-bottom">
              <span>© 2025-2026 GPTShop Pro. All rights reserved.</span>
              <div className="pricing-footer-legal">
                <Link href="/">首页</Link>
                <Link href="/privacy">隐私政策</Link>
                <Link href="/terms">服务条款</Link>
              </div>
            </div>
        </div>
      </footer>

      <Link className="floating-service" href="/purchase?plan=plus-recharge">
        <span className="floating-service-icon">
          <MessageIcon />
        </span>
        <span className="floating-service-text">客服</span>
        <span className="floating-service-dot">1</span>
      </Link>
    </main>
  );
}
