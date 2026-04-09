import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/content-layout";
import {
  faqEntries,
  feedbackEntries,
  getSitePageBySlug,
  guideSteps,
  sitePages,
} from "@/lib/site-content";

export function generateStaticParams() {
  return sitePages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = getSitePageBySlug(slug);
    if (!page) {
      return {};
    }

    return {
      title: page.metaTitle,
      description: page.description,
    };
  });
}

export default async function GenericContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSitePageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <ContentLayout>
      <section className="content-hero">
        <div className="page-container content-hero-grid">
          <div>
            <p className="content-eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="content-description">{page.description}</p>
            <div className="content-actions">
              {page.primaryCta ? <Link href={page.primaryCta.href}>{page.primaryCta.label}</Link> : null}
              {page.secondaryCta ? (
                <Link className="is-secondary" href={page.secondaryCta.href}>
                  {page.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="content-side-card">
            <h2>相关入口</h2>
            <ul>
              {page.related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="content-highlight-section">
        <div className="page-container content-highlight-grid">
          {page.highlights.map((item) => (
            <article className="content-highlight-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {page.template === "feedback" ? (
        <section className="content-section">
          <div className="page-container content-grid-two">
            {feedbackEntries.map((entry) => (
              <article className="content-quote-card" key={entry.name}>
                <p>{entry.quote}</p>
                <footer>
                  <strong>{entry.name}</strong>
                  <span>{entry.role}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.template === "faq" ? (
        <section className="content-section">
          <div className="page-container content-faq-list">
            {faqEntries.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {page.template === "guide" ? (
        <section className="content-section">
          <div className="page-container content-guide-grid">
            {guideSteps.map((step, index) => (
              <article className="content-step-card" key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.template === "lookup" ? (
        <section className="content-section">
          <div className="page-container content-grid-two">
            <form className="content-form-card">
              <label>
                <span>订单号</span>
                <input placeholder="例如：GPT-20260409-0001" type="text" />
              </label>
              <label>
                <span>联系方式</span>
                <input placeholder="微信 / 邮箱 / 手机号" type="text" />
              </label>
              <button type="button">查询订单</button>
            </form>

            <div className="content-state-card">
              <h3>当前状态</h3>
              <p>这个页面已经有完整结构，后续只需要接真实订单接口或表单服务，就能成为正式查单页。</p>
              <ul>
                <li>可接数据库订单查询</li>
                <li>可接客服工单系统</li>
                <li>可补订单时间线</li>
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {page.template === "coupon" ? (
        <section className="content-section">
          <div className="page-container content-grid-two">
            <form className="content-form-card">
              <label>
                <span>优惠码</span>
                <input placeholder="输入你的优惠码" type="text" />
              </label>
              <label>
                <span>绑定联系方式</span>
                <input placeholder="用于识别用户身份" type="text" />
              </label>
              <button type="button">立即领取 / 校验</button>
            </form>

            <div className="content-state-card">
              <h3>适合后续扩展</h3>
              <p>可以继续接入首单折扣、活动券、渠道码或用户邀请奖励。</p>
              <ul>
                <li>限时促销券</li>
                <li>渠道合作福利</li>
                <li>老用户续费优惠</li>
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <section className="content-section">
        <div className={`page-container ${page.template === "legal" ? "content-legal" : "content-section-grid"}`}>
          {page.sections.map((section) => (
            <article className="content-section-card" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.bullets ? (
                <ul className="content-check-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </ContentLayout>
  );
}
