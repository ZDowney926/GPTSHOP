import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ChatGPT 价格总览 | GPTShop Pro",
  description: "总览 ChatGPT Plus、ChatGPT Pro 与团队采购方向的页面入口，再继续进入更具体的方案页。",
};

const products = [
  {
    title: "ChatGPT Plus",
    badge: "主力方案",
    badgeClass: "product-badge-indigo",
    cardClass: "product-card-featured",
    price: "¥159 起",
    note: "适合大多数个人用户",
    description: "继续进入 Plus 方案页，对比代充值与成品账号，再完成购买。",
    tags: [
      { label: "Plus 充值", className: "product-tag-indigo" },
      { label: "成品账号", className: "product-tag-indigo" },
    ],
    cta: { label: "查看 Plus 方案", href: "/plus-price" },
  },
  {
    title: "ChatGPT Pro",
    badge: "高阶方案",
    badgeClass: "product-badge-green",
    cardClass: "product-card-green",
    price: "按需评估",
    note: "适合高频重度用户",
    description: "作为独立页面承接更高阶咨询场景，避免和普通 Plus 流程混在一起。",
    tags: [
      { label: "高级场景", className: "product-tag-green" },
      { label: "咨询入口", className: "product-tag-green" },
    ],
    cta: { label: "查看 Pro 页面", href: "/gptpro" },
  },
  {
    title: "Team / Business",
    badge: "企业采购",
    badgeClass: "product-badge-slate",
    cardClass: "product-card-slate",
    price: "企业沟通",
    note: "适合团队统一采购",
    description: "预留给批量采购、统一续费、对公支付和发票等企业场景。",
    tags: [
      { label: "团队采购", className: "product-tag-slate" },
      { label: "企业沟通", className: "product-tag-slate" },
    ],
    cta: { label: "查看团队页面", href: "/team" },
  },
];

export default function PricePage() {
  return (
    <main className="pricing-page">
      <header className="pricing-header">
        <div className="page-container pricing-header-inner">
          <Link className="pricing-brand" href="/">
            <span className="pricing-brand-mark">G</span>
            <span className="pricing-brand-copy">
              <strong>GPTShop Pro</strong>
              <small>ChatGPT 价格总览</small>
            </span>
          </Link>

          <nav className="pricing-nav" aria-label="价格页导航">
            <Link href="/">首页</Link>
            <Link href="/faq">常见问题</Link>
            <Link href="/guide">升级教程</Link>
            <Link href="/blog">Blog</Link>
          </nav>

          <Link className="pricing-order-link" href="/plus-price">
            查看 Plus 方案
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
            <h1>选择适合您的 ChatGPT 套餐</h1>
            <p className="pricing-hero-subtitle">先从总览页判断方向，再进入具体服务页或方案页</p>
            <p className="pricing-hero-caption">当前优先完成 ChatGPT 主路径，同时保留 Pro 与团队采购入口</p>
          </div>
        </div>
      </section>

      <section className="pricing-products">
        <div className="page-container page-container-narrow">
          <div className="product-grid">
            {products.map((product) => (
              <article className={`product-card ${product.cardClass}`} key={product.title}>
                <div className="product-card-head">
                  <h2>{product.title}</h2>
                  <span className={`product-badge ${product.badgeClass}`}>{product.badge}</span>
                </div>

                <div className="product-price-row">
                  <strong className="product-price">{product.price}</strong>
                </div>

                <div className="product-price-row-text">
                  <div className="product-price-note">{product.note}</div>
                  <p className="product-description">{product.description}</p>
                </div>

                <div className="product-tags">
                  {product.tags.map((tag) => (
                    <span className={`product-tag ${tag.className}`} key={tag.label}>
                      {tag.label}
                    </span>
                  ))}
                </div>

                <Link
                  className={`product-button ${product.cardClass === "product-card-featured" ? "product-button-solid" : "product-button-outline"}`}
                  href={product.cta.href}
                >
                  {product.cta.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
