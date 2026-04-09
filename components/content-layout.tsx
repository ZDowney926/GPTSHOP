import type { ReactNode } from "react";
import Link from "next/link";

export function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="content-page">
      <header className="content-header">
        <div className="page-container content-header-inner">
          <Link className="content-brand" href="/">
            <span className="content-brand-mark">G</span>
            <span className="content-brand-copy">
              <strong>GPTShop Pro</strong>
              <small>AI 购买与帮助中心</small>
            </span>
          </Link>

          <nav className="content-nav" aria-label="内容页导航">
            <Link href="/plus-price">套餐选择</Link>
            <Link href="/faq">常见问题</Link>
            <Link href="/guide">升级教程</Link>
            <Link href="/blog">Blog</Link>
          </nav>

          <Link className="content-header-cta" href="/order">
            查询订单
          </Link>
        </div>
      </header>

      <main className="content-main">{children}</main>

      <footer className="content-footer">
        <div className="page-container content-footer-inner">
          <div className="content-footer-brand">
            <strong>GPTShop Pro</strong>
            <p>用统一的页面骨架补齐帮助、服务、内容和购买路径，方便后续继续替换成你的正式文案。</p>
          </div>

          <div>
            <h3>核心页面</h3>
            <ul>
              <li>
                <Link href="/">首页</Link>
              </li>
              <li>
                <Link href="/price">价格总览</Link>
              </li>
              <li>
                <Link href="/plus-price">Plus 方案</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>支持中心</h3>
            <ul>
              <li>
                <Link href="/faq">常见问题</Link>
              </li>
              <li>
                <Link href="/help">帮助中心</Link>
              </li>
              <li>
                <Link href="/order">订单查询</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>内容与合规</h3>
            <ul>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/privacy">隐私政策</Link>
              </li>
              <li>
                <Link href="/terms">服务条款</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="page-container content-footer-bottom">
          <span>© 2025-2026 GPTShop Pro</span>
          <div>
            <Link href="/privacy">隐私政策</Link>
            <Link href="/terms">服务条款</Link>
          </div>
        </div>
      </footer>

      <Link className="content-floating-cta" href="/plus-price">
        立即下单
      </Link>
    </div>
  );
}
