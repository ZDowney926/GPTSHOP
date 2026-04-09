import { plans } from "@/lib/plans";

const benefits = [
  {
    title: "首屏直接讲清楚价值",
    description: "用户在 5 秒内就能知道你卖什么、适合谁、怎么开始。",
  },
  {
    title: "套餐对比降低决策成本",
    description: "通过清晰的差异点，把犹豫用户引导到主推方案。",
  },
  {
    title: "流程说明降低不确定性",
    description: "把“我需要提供什么”和“多久完成”明确展示出来。",
  },
  {
    title: "评价与 FAQ 负责兜底",
    description: "在用户准备离开前，补上信任和风险解释。",
  },
];

const steps = [
  {
    index: "01",
    title: "提交需求",
    description: "联系顾问，说明你需要首次开通还是后续续费。",
  },
  {
    index: "02",
    title: "确认方案",
    description: "根据账号状态与地区情况，匹配最合适的处理方式。",
  },
  {
    index: "03",
    title: "进入处理",
    description: "按约定步骤推进开通，并在关键节点同步进度。",
  },
  {
    index: "04",
    title: "完成与售后",
    description: "开通完成后提供结果确认，必要时处理续费或异常提醒。",
  },
];

const reviews = [
  "原来一直卡在支付环节，这次按步骤处理后很快就通了，节省了很多试错时间。",
  "页面信息很完整，先看完 FAQ 再下单，心里更有底。",
  "我主要是想找一个稳定续费方案，整体沟通效率比自己折腾强很多。",
];

const faqs = [
  {
    question: "这个页面和 getgpt.pro 是什么关系？",
    answer:
      "这是一个参考其信息架构和转化方式重新制作的前端页面，不是目标站源码镜像，也没有直接复制其具体素材。",
  },
  {
    question: "能不能继续做成完全可商用版本？",
    answer:
      "可以。下一步只需要把你的品牌名、价格、联系方式、支付流程和真实评价替换进去即可上线。",
  },
  {
    question: "现在这个版本能直接打开吗？",
    answer:
      "可以。当前已经是标准 Next.js 项目结构，安装依赖后运行开发服务器即可预览，也可以直接部署到 Vercel。",
  },
  {
    question: "后续能加下单表单和后台吗？",
    answer:
      "可以继续扩展成带表单、支付、后台管理的正式站点，这套结构就是为了后续加这些功能准备的。",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="topbar fade-up">
        <a className="brand" href="#hero">
          <span className="brand-mark">GP</span>
          <span className="brand-copy">
            <strong>GPTShop Pro</strong>
            <small>ChatGPT Plus 服务站</small>
          </span>
        </a>
        <nav className="nav">
          <a href="#plans">套餐</a>
          <a href="#flow">流程</a>
          <a href="#reviews">评价</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="button button-ghost" href="#contact">
          立即咨询
        </a>
      </header>

      <main>
        <section className="hero fade-up" id="hero">
          <div className="hero-copy">
            <p className="eyebrow">Get GPT Plus Faster</p>
            <h1>用更省事的方式开通 ChatGPT Plus</h1>
            <p className="hero-text">
              面向没有海外支付环境、想快速稳定开通 Plus 的用户。页面结构参考高转化代开通站点，保留首屏承诺、套餐对比、流程说明、评价背书和 FAQ。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#plans">
                查看套餐
              </a>
              <a className="button button-secondary" href="#flow">
                了解流程
              </a>
            </div>
            <ul className="hero-points">
              <li>支持代开通与续费协助</li>
              <li>流程透明，步骤清晰</li>
              <li>移动端和桌面端均适配</li>
            </ul>
          </div>

          <div className="hero-card fade-up stagger-1">
            <div className="metric-grid">
              <article>
                <span>平均响应</span>
                <strong>5 min</strong>
              </article>
              <article>
                <span>开通效率</span>
                <strong>24h</strong>
              </article>
              <article>
                <span>已服务用户</span>
                <strong>3,200+</strong>
              </article>
              <article>
                <span>满意度</span>
                <strong>98.6%</strong>
              </article>
            </div>
            <div className="hero-note">
              <p>包含账号检查、付款处理建议、异常状态协助与续费提醒。</p>
            </div>
          </div>
        </section>

        <section className="trust-strip fade-up stagger-2">
          <p>适合以下场景</p>
          <div className="trust-items">
            <span>没有海外银行卡</span>
            <span>Apple Pay / Visa 不稳定</span>
            <span>地区限制导致无法订阅</span>
            <span>想避免重复试错</span>
          </div>
        </section>

        <section className="section fade-up" id="plans">
          <div className="section-heading">
            <p className="eyebrow">Pricing</p>
            <h2>按使用方式选择套餐</h2>
            <p>版式和节奏参考目标站常见的三档套餐结构，突出中间主推方案。</p>
          </div>
          <div className="plan-grid">
            {plans.map((plan) => (
              <article
                className={`plan-card ${plan.featured ? "featured" : ""}`}
                key={plan.name}
              >
                <span className="tag">{plan.tier}</span>
                <h3>{plan.name}</h3>
                <div className="price-wrap">
                  <p className="price">¥{plan.price}</p>
                  {plan.originalPrice ? (
                    <p className="price-original">原价 ¥{plan.originalPrice}</p>
                  ) : null}
                </div>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  className={`button ${plan.featured ? "button-primary" : "button-secondary"}`}
                  href={`/purchase?plan=${plan.slug}`}
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section fade-up">
          <div className="section-heading align-left">
            <p className="eyebrow">Why This Layout Works</p>
            <h2>高转化落地页需要把疑虑提前回答</h2>
          </div>
          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section fade-up" id="flow">
          <div className="section-heading">
            <p className="eyebrow">Flow</p>
            <h2>4 步完成开通</h2>
          </div>
          <div className="timeline">
            {steps.map((step) => (
              <article key={step.index}>
                <span>{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section fade-up" id="reviews">
          <div className="section-heading">
            <p className="eyebrow">Reviews</p>
            <h2>真实用户常见反馈样式</h2>
          </div>
          <div className="review-grid">
            {reviews.map((review, index) => (
              <article className="review-card" key={review}>
                <p>“{review}”</p>
                <strong>
                  {index === 0
                    ? "产品经理 / 上海"
                    : index === 1
                      ? "独立开发者 / 深圳"
                      : "跨境运营 / 杭州"}
                </strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section fade-up" id="faq">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>用户最关心的问题</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section cta fade-up" id="contact">
          <div>
            <p className="eyebrow">Start Now</p>
            <h2>把它改成你的正式站点</h2>
            <p>把品牌名、套餐、联系方式与支付说明替换为你的真实业务信息，这个页面就能直接作为着陆页使用。</p>
          </div>
          <div className="cta-actions">
            <a className="button button-primary" href="/purchase?plan=plus-complete">
              立即充值
            </a>
            <a
              className="button button-ghost"
              href="https://t.me/"
              rel="noreferrer"
              target="_blank"
            >
              Telegram
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
