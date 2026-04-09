import type { Metadata } from "next";
import Link from "next/link";
import { ContentLayout } from "@/components/content-layout";
import { blogPosts } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Blog | GPTShop Pro",
  description: "围绕 AI 购买路径、模型更新、网络环境和站点运营的内容页面集合。",
};

export default function BlogIndexPage() {
  return (
    <ContentLayout>
      <section className="content-hero">
        <div className="page-container content-hero-grid">
          <div>
            <p className="content-eyebrow">Blog</p>
            <h1>AI 购买与使用内容中心</h1>
            <p className="content-description">
              当前按照源站的内容层级，补齐了博客列表和文章详情页。文章主题覆盖模型更新、网络环境、购买路径和站点运营。
            </p>
            <div className="content-actions">
              <Link href="/plus-price">查看套餐</Link>
              <Link className="is-secondary" href="/faq">
                常见问题
              </Link>
            </div>
          </div>

          <aside className="content-side-card">
            <h2>当前统计</h2>
            <ul>
              <li>{blogPosts.length} 篇文章结构已补齐</li>
              <li>支持文章详情页和列表页</li>
              <li>后续只需替换正式内容</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="content-section">
        <div className="page-container blog-grid">
          {blogPosts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <div className="blog-meta">
                <span>{post.category}</span>
                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`}>阅读文章</Link>
            </article>
          ))}
        </div>
      </section>
    </ContentLayout>
  );
}
