import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/content-layout";
import { blogPosts, getBlogPostBySlug } from "@/lib/site-content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogPostBySlug(slug);
    if (!post) {
      return {};
    }

    return {
      title: post.metaTitle,
      description: post.excerpt,
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3);

  return (
    <ContentLayout>
      <section className="content-hero">
        <div className="page-container article-hero">
          <p className="content-eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="content-description">{post.excerpt}</p>
          <div className="article-meta">
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <Link href="/blog">返回博客列表</Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="page-container article-layout">
          <article className="article-card">
            {post.sections.map((section) => (
              <section className="article-section" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                {section.bullets ? (
                  <ul className="content-check-list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>

          <aside className="article-sidebar">
            <div className="content-side-card">
              <h2>下一步动作</h2>
              <ul>
                <li>
                  <Link href="/plus-price">查看套餐选择</Link>
                </li>
                <li>
                  <Link href="/help">前往帮助中心</Link>
                </li>
                <li>
                  <Link href="/faq">查看常见问题</Link>
                </li>
              </ul>
            </div>

            <div className="content-side-card">
              <h2>相关文章</h2>
              <ul>
                {relatedPosts.map((entry) => (
                  <li key={entry.slug}>
                    <Link href={`/blog/${entry.slug}`}>{entry.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </ContentLayout>
  );
}
